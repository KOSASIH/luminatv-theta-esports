# iot_data_processing.py
import asyncio
import json

class IoTDataProcessor:
    def __init__(self):
        self.data = []

    async def process_data(self, device, message):
        data = json.loads(message)
        data["device"] = device.name
        self.data.append(data)

    async def process_all(self):
        while True:
            await asyncio.sleep(1.0)
            print("Processing data...")
            processed_data = [json.dumps(d) for d in self.data]
            self.data = []
            print("Data processed:", processed_data)

async def main():
    processor = IoTDataProcessor()
    devices = IoTDevices()
    devices.add_device(IoTDevice("Device 1", "/dev/ttyACM0", 9600))
    devices.add_device(IoTDevice("Device 2", "/dev/ttyACM1", 9600))
    await devices.connect_all()
    await asyncio.gather(
        devices.receive_all(),
        processor.process_all()
    )
    await devices.disconnect_all()

if __name__ == "__main__":
    asyncio.run(main())
