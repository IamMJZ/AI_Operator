# INSTALL PYTHON ENVIRONMENT

```bash
# Create a virtual environment
python3 -m venv .venv && source .venv/bin/activate
```

# INSTALL DEPENDENCIES

```bash
# Install dependencies
pip install -r requirements.txt
```

# SET ENV SECRETS in .env file

Required:

- LIVEKIT_API_KEY
- LIVEKIT_API_SECRET
- GROQ_API_KEY
- LIVEKIT_HOST
- OPENAI_API_KEY
- HF_API_KEY

# RUN THE APPLICATION

You should have GPU in the system to run the application. Not optimised for CPU yet.

# Go to the downloads.ipynb file, choose the .venv as python source, download the models and get_token for the room

1. Download the models
2. Get Token for the second peer connection
3. Go to https://meet.livekit.io
4. Switch to custom page
5. Type:
   Livekit Server URL: wss://consultant-ai-weia2b76.livekit.cloud
   Token: <the token you got from running get_token function in downloads.ipynb>

```bash
# Run the application

python new_server.py load en <room_name> python_bot_2 1

```

description of parameters

- load: command to load the bot
- en: language of the bot
- <room_name>: room id of the second peer ----- for the test case room_name = test_api
- python_bot_2: name of the bot in the room
- 1: the index of the GPU to use
