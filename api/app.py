# api/app.py (Repositório separado)
from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/analise')
def analise():
    dados = {"AMBI": 2.1, "Shannon": 1.8}
    return jsonify(dados)

# Hospede em serviços como:
# - Render.com (Free tier)
# - PythonAnywhere
