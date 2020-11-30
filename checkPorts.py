#!/usr/bin/env python3
import time
import sys
import subprocess

def is_port_in_use(port):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0 or s.connect_ex(('131.234.29.153', port)) == 0 or s.connect_ex(('popmachine.cs.upb.de', port)) == 0
    
def searchFreePort(begin, end):
    for port in range(begin, end):
        if is_port_in_use(port) == False:
            print("found open port: ",port)
            return port
        else:
            print("Port: ",port, " is closed")

port = searchFreePort(8080, 9081)

textList = list()

fobj = open("Gruntfile.js", "r")
for line in fobj:
    textList.append(line.rstrip())
fobj.close()

portMarker = "port:"
for i in range(0, len(textList)):
    if textList[i].find(portMarker) != -1:
        textList[i] = "          port:"
        textList[i] = textList[i].replace(portMarker, "port: " + str(port) + ",",len(textList[i]))
    
fobj = open("Gruntfile.js", "w")
for i in range(0, len(textList)):
    fobj.write(textList[i].rstrip()) 
    fobj.write("\n")
fobj.close()

def get_git_revision_hash():
    return subprocess.check_output(['git', 'rev-parse', 'HEAD'])
#def get_git_revision_short_hash():
#    return subprocess.check_output(['git', 'rev-parse', '--short', 'HEAD'])

fobj = open("/home/gitlab-runner/startedJobs.txt", "a")
fobj.write("Open Port on: " + str(port) + ", Date: " + time.strftime("%d.%m.%Y, Time: %H:%M:%S") + ", Commit: " + str(get_git_revision_hash().decode('ascii').strip()))
fobj.write("\n\n")
fobj.close()

outputList = list()
fobj = open("/home/gitlab-runner/startedJobs.txt", "r")
for line in fobj:
    outputList.append(line.rstrip())
fobj.close()

outputList.reverse()

fobj = open("/home/gitlab-runner/index.html", "w")
fobj.write("<html>\n")
fobj.write("<body>\n")
if len(outputList) >= 40:
    for i in range(0, 40):
        fobj.write("<p>" + outputList[i].rstrip() + "</p>\n")
else:
    for i in range(0, len(outputList)):
        fobj.write("<p>" + outputList[i].rstrip() + "</p>\n")
fobj.write("</body>\n")
fobj.write("</html>\n")
fobj.close()