#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
i = 0
in_mobile_section = False

while i < len(lines):
    line = lines[i]
    
    # Mark when we enter mobile section
    if '{/* Цены справа - только на мобильных */}' in line:
        in_mobile_section = True
        new_lines.append(line)
        i += 1
        continue
    
    # In mobile section, look for the condition
    if in_mobile_section and 'isSubcategoryOpen(section.id, subcategory.id) &&' in line:
        # Get indentation
        indent = ' ' * (len(line) - len(line.lstrip()))
        
        # Replace condition line with span opening
        new_lines.append(indent + '<span\n')
        i += 1
        
        # Skip until we find zł
        while i < len(lines) and 'zł' not in lines[i]:
            i += 1
        
        if i < len(lines):
            # Add span attributes and content
            new_lines.append(indent + '  className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex"\n')
            new_lines.append(indent + '  style={{ textShadow: supplementTextShadow, marginTop: ''-3px'' }}\n')
            new_lines.append(indent + '>\n')
            new_lines.append(indent + '  zł\n')
            new_lines.append(indent + '</span>\n')
            
            # Skip the old span lines and closing paren
            while i < len(lines) and ')' not in lines[i]:
                i += 1
            i += 1  # Skip the closing paren line
            in_mobile_section = False
            continue
    else:
        new_lines.append(line)
        i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed mobile prices display")


