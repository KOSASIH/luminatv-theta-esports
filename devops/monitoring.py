# monitoring.py
import os
import time
import requests
import psutil
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def check_cpu_usage():
    """
    Check the CPU usage.

    :return: The CPU usage
    """
    return psutil.cpu_percent()

def check_memory_usage():
    """
    Check the memory usage.

    :return: The memory usage
    """
    return psutil.virtual_memory().percent

def check_disk_usage():
    """
    Check the disk usage.

    :return: The disk usage
    """
    return psutil.disk_usage('/').percent

def check_network_usage():
    """
    Check the network usage.

    :return: The network usage
    """
    return psutil.net_io_counters().bytes_sent + psutil.net_io_counters().bytes_recv

def check_website_availability(url):
    """
    Check the availability of a website.

    :param url: The URL of the website
    :return: True if the website is available, False otherwise
    """
    try:
        requests.get(url)
        return True
    except requests.ConnectionError:
        return False

def send_email(subject, body):
    """
    Send an email.

    :param subject: The subject of the email
    :param body: The body of the email
    :return: None
    """
    # Set the email parameters
    sender_email = "sender@example.com"
    receiver_email = "receiver@example.com"
    password = "password"

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Send the email
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, password)
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
   server.quit()

def main():
    """
    The main function.

    :return: None
    """
    # Check the CPU usage
    cpu_usage = check_cpu_usage()
    print(f"CPU usage: {cpu_usage}%")

    # Check the memory usage
    memory_usage = check_memory_usage()
    print(f"Memory usage: {memory_usage}%")

    # Check the disk usage
    disk_usage = check_disk_usage()
    print(f"Disk usage: {disk_usage}%")

    # Check the network usage
    network_usage = check_network_usage()
    print(f"Network usage: {network_usage} bytes")

    # Check the website availability
    website_url = "https://www.example.com"
    website_available = check_website_availability(website_url)
    if website_available:
        print(f"{website_url} is available")
    else:
        print(f"{website_url} is not available")

    # Send an email if the CPU usage is above 80%
    if cpu_usage > 80:
        send_email("High CPU usage", f"The CPU usage is {cpu_usage}%")

    # Send an email if the memory usage is above 80%
    if memory_usage > 80:
        send_email("High memory usage", f"The memory usage is {memory_usage}%")

    # Send an email if the disk usage is above 80%
    if disk_usage > 80:
        send_email("High disk usage", f"The disk usage is {disk_usage}%")

    # Send an email if the website is not available
    if not website_available:
        send_email("Website unavailable", f"{website_url} is not available")

if __name__ == "__main__":
    main()
