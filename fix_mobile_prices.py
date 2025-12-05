#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the mobile section
mobile_comment = '{/* Цены справа - только на мобильных */}'
idx = content.find(mobile_comment)

if idx == -1:
    print("Mobile comment not found")
    exit(1)

# Find the condition in the mobile section (within next 2000 chars)
mobile_section = content[idx:idx+2000]
condition_start = mobile_section.find('{isSubcategoryOpen(section.id, subcategory.id) && (')

if condition_start == -1:
    print("Condition not found in mobile section")
    exit(1)

# Find the end of the conditional block
condition_end = mobile_section.find(')}', condition_start)
if condition_end == -1:
    print("End of condition not found")
    exit(1)

# Replace the conditional with just the span
before = content[:idx + condition_start]
# Skip the condition and closing paren, keep the span content
span_start = mobile_section.find('<span', condition_start)
span_end = mobile_section.find('</span>', span_start)
if span_end == -1:
    print("Span end not found")
    exit(1)

# Extract the span content
span_content = mobile_section[span_start:span_end + 7]  # +7 for </span>

# Find where the closing )} is
closing_idx = mobile_section.find(')}', span_end)
if closing_idx == -1:
    print("Closing )} not found")
    exit(1)

# Reconstruct: before + span + after (skip the condition and closing paren)
after_start = idx + condition_start + closing_idx + 2
after = content[after_start:]

new_content = before + '                                              ' + span_content + '\n' + after

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement completed successfully")


