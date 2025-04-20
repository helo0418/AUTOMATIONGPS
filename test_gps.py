from kafka import KafkaProducer
import json
import time

# Configurar el Kafka Producer
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',  # Cambia por la IP de tu contenedor Kafka si no usas localhost
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Definir el topic
topic = 'gps_coordinates'

# Enviar datos simulados de GPS
gps_data = {
    'latitude': 40.7128,
    'longitude': -74.0060,
    'timestamp': int(time.time())
}

# Enviar el mensaje
producer.send(topic, gps_data)
producer.flush()

print("Mensaje de GPS enviado correctamente!")


