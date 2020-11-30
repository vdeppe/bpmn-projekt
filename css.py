#!/usr/bin/env python3
import json
    
with open('./resources/test2.json', 'r') as f:
    distros_dict = json.load(f)

f.close()

names = list()
types = list()
logos = list()

for distro in distros_dict['types']:
    names.append(distro['name'])
    logos.append(distro['logo'])
    types.append(distro['type'])
    
with open('./resources/custom.css', 'w') as f:
    for i in range(0, len(names)):
        if "Task" in types.__getitem__(i):
            f.write(".bpmn-icon-task." + names.__getitem__(i) + " {" + "\n")
        elif "DataObject" in types.__getitem__(i):
            f.write(".bpmn-icon-data-object." + names.__getitem__(i) + " {" + "\n")
        f.write("    color: black !important;\n")      
        f.write("    background:url('" + logos.__getitem__(i) + "') #ffffff scroll no-repeat;\n")
        f.write("    background-position: center;\n")
        f.write("    background-attachment: local;\n")
        f.write("    margin:0pt auto;\n")
        f.write("}\n")
    f.close()
    
CustomPalette = list()
with open("./app/custom/CustomPalette_unchanged.js", "r") as f:
    for line in f:
        CustomPalette.append(line.rstrip())
    f.close()
    
marker = "return {"
newCode = list()
for i in range(0, len(CustomPalette)):
    newCode.append(CustomPalette[i])
    if CustomPalette[i].find(marker) != -1:
        for j in range(0, len(names)):
            newCode.append("'task" + str(j) + "': {")
            newCode.append("group: 'artifact',")
            newCode.append("className: changeClass(customElements.types[" + str(j) + "].name, customElements.types[" + str(j) + "].type),")
            newCode.append("title: translate(customElements.types[" + str(j) + "].titlePalette),")
            newCode.append("action: {")
            newCode.append("dragstart: createTask(customElements.types[" + str(j) + "].type, customElements.types[" + str(j) + "].ApplicationID, customElements.types[" + str(j) + "].AssistanceSystemType),")
            newCode.append("click: createTask(customElements.types[" + str(j) + "].type, customElements.types[" + str(j) + "].ApplicationID, customElements.types[" + str(j) + "].AssistanceSystemType)")
            newCode.append("}")
            if j < len(names) - 1:
                newCode.append("},")
            else:
                newCode.append("}")

with open("./app/custom/CustomPalette.js", "w") as f:
    for i in newCode:
        f.write(i + "\n")
		
newCode.clear()
CustomContextPad = list()
with open("./app/custom/CustomContextPad_unchanged.js", "r") as f:
    for line in f:
        CustomContextPad.append(line.rstrip())
    f.close()
for i in range(0, len(CustomContextPad)):
    newCode.append(CustomContextPad[i])
    if CustomContextPad[i].find(marker) != -1:
        for j in range(0, len(names)):
            newCode.append("'append.high-task" + str(j) + "': {")
            newCode.append("group: 'model',")
            newCode.append("className: changeClass(customElements.types[" + str(j) + "].name, customElements.types[" + str(j) + "].type),")
            newCode.append("title: translate(customElements.types[" + str(j) + "].titlePad),")
            newCode.append("action: {")
            newCode.append("dragstart: appendServiceTaskStart(customElements.types[" + str(j) + "].type, customElements.types[" + str(j) + "].ApplicationID, customElements.types[" + str(j) + "].AssistanceSystemType),")
            newCode.append("click: appendServiceTask(customElements.types[" + str(j) + "].type, customElements.types[" + str(j) + "].ApplicationID, customElements.types[" + str(j) + "].AssistanceSystemType)")
            newCode.append("}")
            if j < len(names) - 1:
                newCode.append("},")
            else:
                newCode.append("}")
                    
with open("./app/custom/CustomContextPad.js", "w") as f:
    for i in newCode:
        f.write(i + "\n")
    f.close()