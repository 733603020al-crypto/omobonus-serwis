#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the exact location
mobile_comment = '{/* Цены справа - только на мобильных */}'
mobile_idx = content.find(mobile_comment)

if mobile_idx == -1:
    print("Mobile comment not found")
    exit(1)

# Get the section after mobile comment
section = content[mobile_idx:mobile_idx+2500]

# Find condition
cond_pattern = '{isSubcategoryOpen(section.id, subcategory.id) && ('
cond_idx = section.find(cond_pattern)

if cond_idx == -1:
    print("Condition not found")
    exit(1)

# Find the span tag inside the condition
span_start = section.find('<span', cond_idx)
if span_start == -1:
    print("Span not found")
    exit(1)

# Find closing </span>
span_end = section.find('</span>', span_start)
if span_end == -1:
    print("Span end not found")
    exit(1)

# Find closing )}
close_idx = section.find(')}', span_end)
if close_idx == -1:
    print("Closing paren not found")
    exit(1)

# Extract span with proper formatting
span_content = section[span_start:span_end+7]

# Build new content
before = content[:mobile_idx + cond_idx]
after = content[mobile_idx + cond_idx + close_idx + 2:]

# Add proper indentation (14 spaces)
indent = '                                              '
new_content = before + indent + span_content + '\n' + after

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully fixed mobile prices!")


