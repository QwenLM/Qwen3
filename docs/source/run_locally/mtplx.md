# MTPLX

[MTPLX](https://github.com/youssofal/MTPLX) runs Qwen models on Apple Silicon using the multi-token prediction heads that ship with Qwen3.5, Qwen3.6 and Qwen3.8.
It drafts several tokens per step, verifies them against the model in one batched pass, and keeps the output distribution identical to plain decoding at any temperature.
It runs on any Apple Silicon Mac with macOS 14 or newer.

## Prerequisites

Install the command line with Homebrew:

```bash
brew install youssofal/mtplx/mtplx
```

or with `pip`:

```bash
pip install mtplx
```

or download the Mac app from [mtplx.com](https://mtplx.com), which installs everything and picks a model that fits your Mac.

## Quickstart

```bash
mtplx start
```

The first run walks you through picking a model, downloads the pack, measures which draft depth is fastest on your Mac, and opens a chat.
`mtplx start` also serves an OpenAI-compatible API at `http://127.0.0.1:8000/v1` and an Anthropic-compatible API at `http://127.0.0.1:8000/v1/messages`, so Qwen Code, OpenCode, Claude Code, Continue and Open WebUI work by pointing them at that address.

To run a specific pack:

```bash
mtplx start cli --model Youssofal/Qwen3.8-27B-MTPLX-Optimized-Speed --download
```

Server only:

```bash
mtplx serve --model Youssofal/Qwen3.8-Flash-Next-MTPLX-Optimized-Speed --download
```

## Packs

Ready-made MTPLX packs are on the Hugging Face Hub under [Youssofal](https://huggingface.co/Youssofal):

| Model | Pack | Mac memory |
|---|---|---|
| Qwen3.8-Flash-Next | [Youssofal/Qwen3.8-Flash-Next-MTPLX-Optimized-Speed](https://huggingface.co/Youssofal/Qwen3.8-Flash-Next-MTPLX-Optimized-Speed) | 96 GB or more |
| Qwen3.8-27B | [Youssofal/Qwen3.8-27B-MTPLX-Optimized-Speed](https://huggingface.co/Youssofal/Qwen3.8-27B-MTPLX-Optimized-Speed) | 32 GB or more |
| Qwen3.8-27B | [Youssofal/Qwen3.8-27B-MTPLX-Optimized-Quality](https://huggingface.co/Youssofal/Qwen3.8-27B-MTPLX-Optimized-Quality) | 32 GB or more |
| Qwen3.5-9B | [Youssofal/Qwen3.5-9B-MTPLX-Optimized-Speed](https://huggingface.co/Youssofal/Qwen3.5-9B-MTPLX-Optimized-Speed) | 16 GB or more |
| Qwen3.5-4B | [Youssofal/Qwen3.5-4B-MTPLX-Optimized-Speed](https://huggingface.co/Youssofal/Qwen3.5-4B-MTPLX-Optimized-Speed) | 16 GB or more |

The Qwen3.8-27B packs agree with the full-precision model on 96.0 percent (Optimized Speed) and 99.3 percent (Optimized Quality) of top tokens.
On M1 and M2 Macs the app and the command line pick the FP16 build of each pack automatically.

## Speeds

Measured on an M5 Max with MTPLX 2.11.3, raw logs at [mtplx.com/benchmarks](https://mtplx.com/benchmarks/):

- Qwen3.8-Flash-Next: 125.8 tokens per second on one OpenCode request; 79 tokens per second at 9k context, 62 at 109k, 50 at 200k.
- Qwen3.8-27B: 87.6 tokens per second on a rewrite task, 65 on coding tasks.
- Qwen3.5-4B: 228 tokens per second.

## Use with Qwen Code and other clients

Any client that speaks the OpenAI or Anthropic API works. For OpenCode, `mtplx start opencode` loads the model and launches OpenCode already configured. For other clients, set the base URL to `http://127.0.0.1:8000/v1` and the model to the id shown by `mtplx models`; the API key can be any non-empty string on localhost.
