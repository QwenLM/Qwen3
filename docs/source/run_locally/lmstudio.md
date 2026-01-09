# LM Studio

[LM Studio](https://lmstudio.ai) is a powerful desktop application for experimenting & developing with local AI models directly on your computer. You can run multiple kinds of Qwen models: from dense LLMs, VLMs, to MoEs and reasoning variants. LM Studio supports both GGUF (llama.cpp) and MLX formats for fast and efficient inference, completely privately on your machine.

## Download and Install LM Studio

Download the installer for macOS, Windows, or Linux from the [LM Studio website](https://lmstudio.ai/download).

## Get Qwen models 

Qwen models are much loved by the community, and they frequently get featured in Staff Picks. Explore staff picked models within the app or in [https://lmstudio.ai/models](https://lmstudio.ai/models). Find Qwen models that fit your machine, and click Run in LM Studio! You can also search and download Qwen models from within the LM Studio app, or by using the `lms` CLI ([learn more](https://lmstudio.ai/docs/cli/local-models/get)).

**Using the in-app model downloader**
1. Open the LM Studio app and search for any model by presssing `⌘ + Shift + M` on Mac, or `Ctrl + Shift + M` on PC. 
2. Search for "Qwen."   
3. Pick a result that looks interesting and LM Studio will suggest the optimal variants for your hardware.  
4. Click **Download**. After the download finishes, load the model to use it in a new chat.

**Getting a model from Hugging Face**

First, enable LM Studio under your [Local Apps Settings](https://huggingface.co/settings/local-apps) in Hugging Face. 

On the model card, click the "Use this model" dropdown and select LM Studio. This will run the model directly in LM Studio if you already have it, or show you a download option if you don't.  

**Advanced: Use your own converted GGUF Qwen model file**

If you had converted a Qwen model to GGUF yourself, you can use LM Studio's CLI `lms` to load your model into LM Studio.

1. Use:
    ```bash
    lms import <path/to/model.gguf>
    ```
2. LM Studio will automatically detect the model and it will populate in the application under "My Models".
3. Adjust context length and hardware settings as needed.

If `lms import` does not work automatically, fear not. You are still able to manually import models into your LM Studio. Read more about LM Studio's model directory structure [here](https://lmstudio.ai/docs/app/advanced/import-model).

Once the model has completed loading (as indicated by the progress bar), you may start chatting away in LM Studio!

## Serve the model through LM Studio's server

**Serve via LM Studio's GUI**

In the LM Studio application, press `⌘ / Ctrl + L` to open the model loader. Here you can view a list of downloaded models and select one to load. LM Studio will by default select the load parameters that optimizes model performance on your hardware.

**Serve via LM Studio's CLI**

If you prefer to work in the terminal, use LM Studio's CLI to interact with your models. See a list of commands [here](https://lmstudio.ai/docs/cli). Note that you need to run LM Studio ***at least once*** before you can use `lms`.

Next, turn on LM Studio's local API server by running:
```bash
lms server start
```
Now you're ready to go! Use LM Studio's REST APIs to use Qwen models programmatically from your own code. 

Learn more about how to do this at <https://lmstudio.ai/docs/developer>.
