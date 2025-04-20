from kafka import KafkaConsumer
import json

# Crear el consumidor
consumer = KafkaConsumer(
    'gps_topic',
    bootstrap_servers='localhost:9092',
    group_id='nuevo-grupo',  # cambia el group_id para evitar conflictos
    value_deserializer=lambda x: json.loads(x.decode('utf-8')),
    auto_offset_reset='earliest'  # leer desde el inicio del tópico
)



print("Conectado a Kafka, esperando mensajes...")

# Leer los mensajes
for message in consumer:
    print(f'Recibido: {message.value}')

