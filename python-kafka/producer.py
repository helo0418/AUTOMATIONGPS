from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

vehicle_data = [
    {"vehicleId": "123ABC", "lat": 40.41, "lng": -3.70},
    {"vehicleId": "123ABC", "lat": 40.42, "lng": -3.71},
    {"vehicleId": "123ABC", "lat": 40.43, "lng": -3.72},
]

for data in vehicle_data:
    producer.send('gps_topic', data)
    print(f"Sent: {data}")
    time.sleep(1)

producer.flush()
