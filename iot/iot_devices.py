# iot_devices.py
import asyncio
import async_timeout
import serial_asyncio

class IoTDevice:
    def __init__(self, name, port, baudrate):
        self.name = name
        self.port = port
        self.baudrate = baudrate
        self.connected = False
        self.reader = None
        self.writer = None

    async def connect(self):
        try:
            self.reader, self.writer = await asyncio.get_event_loop().create_connection(
                lambda: serial_asyncio.SerialStreamReader(serial_asyncio.create_serial_connection(asyncio.get_event_loop(), self.port, baudrate=self.baudrate)),
                self.port
            )
            self.connected = True
            print(f"{self.name} connected")
        except asyncio.TimeoutError:
            print(f"{self.name} connection timeout")
        except Exception as e:
            print(f"{self.name} connection error: {e}")

    async def disconnect(self):
        if self.connected:
            self.writer.close()
            await self.writer.wait_closed()
            self.connected = False
            print(f"{self.name} disconnected")

    async def send(self, message):
        if self.connected:
            self.writer.write(message.encode())
            await self.writer.drain()
            print(f"{self.name} sent: {message}")

    async def receive(self):
        if self.connected:
            try:
                message = await asyncio.wait_for(self.reader.read(100), timeout=1.0)
                print(f"{self.name} received: {message.decode().strip()}")
            except asyncio.TimeoutError:
                pass

class IoTDevices:
    def __init__(self):
        self.devices = []

    def add_device(self, device):
        self.devices.append(device)

    async def connect_all(self):
        for device in self.devices:
            await device.connect()

    async def disconnect_all(self):
        for device in self.devices:
            await device.disconnect()

    async def send_all(self, message):
        for device in self.devices:
            await device.send(message)

    async def receive_all(self):
        for device in self.devices:
            await device.receive()

async def main():
    devices = IoTDevices()
    devices.add_device(IoTDevice("Device 1", "/dev/ttyACM0", 9600))
    devices.add_device(IoTDevice("Device 2", "/dev/ttyACM1", 9600))
    await devices.connect_all()
    await devices.send_all("Hello, IoT devices!")
    await asyncio.sleep(1.0)
    await devices.receive_all()
    await devices.disconnect_all()

if __name__ == "__main__":
    asyncio.run(main())
