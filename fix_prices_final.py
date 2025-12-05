#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find mobile section
mobile_idx = content.find('{/* Цены справа - только на мобильных */}')
if mobile_idx == -1:
    print("Mobile section not found")
    exit(1)

# Find the condition in mobile section
section = content[mobile_idx:mobile_idx+2500]
cond_start = section.find('{isSubcategoryOpen(section.id, subcategory.id) && (')

if cond_start == -1:
    print("Condition not found")
    exit(1)

# Find the span tag
span_start = section.find('<span', cond_start)
if span_start == -1:
    print("Span not found")
    exit(1)

# Find the closing </span>
span_end = section.find('</span>', span_start)
if span_end == -1:
    print("Span end not found")
    exit(1)

# Find the closing )}
close_paren = section.find(')}', span_end)
if close_paren == -1:
    print("Closing paren not found")
    exit(1)

# Extract span content
span_content = section[span_start:span_end+7]

# Build new content
before = content[:mobile_idx + cond_start]
after = content[mobile_idx + cond_start + close_paren + 2:]

# Add proper indentation (14 spaces based on the code structure)
indent = '                                              '
new_content = before + indent + span_content + '\n' + after

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully replaced condition with always-visible zł")


