# MLflow

This guide shows you how to trace your Qwen model calls with [MLflow](https://mlflow.org/), an [open-source](https://github.com/mlflow/mlflow) agent engineering platform.
By enabling MLflow tracing, you can inspect every API call to Qwen, including input prompts, responses, token usage, latencies, and tool invocations — all in a visual trace UI.

Qwen models can be served locally with [vLLM](../deployment/vllm) or [SGLang](../deployment/sglang), both of which expose an OpenAI-compatible API.
MLflow's OpenAI autologging automatically captures traces for all calls made through the OpenAI SDK, so it works seamlessly with locally served Qwen models.

## Setup

### Serve Qwen Locally

First, start a local Qwen model with vLLM or SGLang. Here we use Qwen3-8B as an example:

::::{tab-set}

:::{tab-item} vLLM

```bash
vllm serve Qwen/Qwen3-8B --port 8000 --enable-reasoning --reasoning-parser qwen3
```

:::

:::{tab-item} SGLang

```bash
python -m sglang.launch_server --model-path Qwen/Qwen3-8B --port 8000 --reasoning-parser qwen3
```

:::

::::

For more details on deployment options and model sizes, see [vLLM](../deployment/vllm) and [SGLang](../deployment/sglang).

:::{tip}
You can also use the [DashScope API](https://www.alibabacloud.com/help/en/model-studio/getting-started/) instead of a local server.
In that case, set `base_url="https://dashscope-intl.aliyuncs.com/compatible-mode/v1"` and `api_key` to your DashScope API key in the examples below.
:::

### Start MLflow

The quickest way to start the MLflow tracking server is with `uvx`:

```bash
uvx mlflow[genai] server --port 5000
```

The MLflow UI will be available at `http://localhost:5000`.

:::{note}
There are other ways to set up MLflow, including Docker Compose, pip install, and managed services such as [Databricks](https://www.databricks.com/product/managed-mlflow) and [AWS SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/mlflow.html).
See the [MLflow setup guide](https://mlflow.org/docs/latest/genai/getting-started/connect-environment/) for details.
:::

### Install Dependencies

```bash
pip install mlflow>=2.21.0 openai>=3.1.0
```

## Basic Usage

The following example traces chat completion calls to a locally served Qwen model.
`mlflow.openai.autolog()` enables automatic tracing for all OpenAI SDK calls.

```python
import mlflow
from openai import OpenAI

# Enable automatic tracing
mlflow.openai.autolog()

# Point MLflow to the tracking server
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("qwen-tracing")

# Connect to the local Qwen server
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="EMPTY",
)

response = client.chat.completions.create(
    model="Qwen/Qwen3-8B",
    messages=[
        {"role": "user", "content": "Give me a short introduction to large language models."},
    ],
    max_tokens=32768,
    temperature=0.6,
    top_p=0.95,
    extra_body={"top_k": 20},
)
print(response.choices[0].message.content)
```

Open `http://localhost:5000` in your browser and navigate to the **qwen-tracing** experiment.
Click on the **Traces** tab to see the recorded trace, which includes input/output messages, token counts, latency, and model parameters.

## Function Calling

MLflow also traces Qwen's function calling flow.
Each step — the initial request, tool calls, and the follow-up response — appears as separate spans in the trace.

```python
import json
import mlflow
from mlflow.entities import SpanType
from openai import OpenAI

mlflow.openai.autolog()
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("qwen-function-calling")

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="EMPTY",
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get the current weather for a location.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. 'Beijing'",
                    }
                },
                "required": ["location"],
            },
        },
    }
]


@mlflow.trace(span_type=SpanType.TOOL)
def get_weather(location: str) -> dict:
    # In a real application, this would call a weather API
    return {"temperature": "22°C", "condition": "Sunny"}


@mlflow.trace(span_type=SpanType.AGENT)
def run_agent(user_query: str) -> str:
    messages = [{"role": "user", "content": user_query}]

    # First call — model decides whether to use tools
    response = client.chat.completions.create(
        model="Qwen/Qwen3-8B",
        messages=messages,
        tools=tools,
    )

    if not response.choices[0].message.tool_calls:
        return response.choices[0].message.content

    # Execute tool calls
    messages.append(response.choices[0].message)
    for tool_call in response.choices[0].message.tool_calls:
        result = get_weather(**json.loads(tool_call.function.arguments))
        messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result),
            }
        )

    # Second call — model incorporates tool results
    final_response = client.chat.completions.create(
        model="Qwen/Qwen3-8B",
        messages=messages,
        tools=tools,
    )
    return final_response.choices[0].message.content


print(run_agent("What's the weather like in Hangzhou?"))
```

In the MLflow UI, you can inspect the full function calling flow — the parent `run_agent` span contains the first LLM call, the `get_weather` tool execution, and the second LLM call with the tool result.

## Next Step

Now you can trace and inspect your Qwen model calls.
For more advanced usage such as streaming, async calls, and custom spans, refer to the following resources:

- [MLflow Qwen Integration Guide](https://mlflow.org/docs/latest/genai/tracing/integrations/listing/qwen/)
- [MLflow Tracing Documentation](https://mlflow.org/docs/latest/genai/tracing/)
