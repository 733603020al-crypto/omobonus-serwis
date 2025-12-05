#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import sys

# Get absolute path
base_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(base_dir, 'src', 'app', 'uslugi', 'service-accordion.tsx')
file_path = os.path.abspath(file_path)

print("=" * 80)
print("MOBILE PRICES FIX")
print("=" * 80)
print(f"File: {file_path}")
print(f"File exists: {os.path.exists(file_path)}")
print()

# Read file
print("1. Reading file...")
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"   ✓ File read: {len(content)} characters")
except Exception as e:
    print(f"   ✗ Error reading file: {e}")
    sys.exit(1)

# Find mobile section
print("\n2. Finding mobile section...")
mobile_comment = '{/* Цены справа - только на мобильных */}'
mobile_idx = content.find(mobile_comment)
if mobile_idx == -1:
    print("   ✗ Mobile comment NOT FOUND!")
    sys.exit(1)
print(f"   ✓ Found at position {mobile_idx}")

# Find condition in mobile section
print("\n3. Finding condition in mobile section...")
section = content[mobile_idx:mobile_idx+2500]
cond_pattern = '{isSubcategoryOpen(section.id, subcategory.id) && ('
cond_start = section.find(cond_pattern)

if cond_start == -1:
    print("   ❌ Совпадений не найдено. Проверь форматирование строк.")
    sys.exit(1)

print(f"   ✓ Found condition at position {mobile_idx + cond_start}")

# Find span and closing paren
print("\n4. Finding span and closing paren...")
span_start = section.find('<span', cond_start)
span_end = section.find('</span>', span_start)
close_paren = section.find(')}', span_end)

if span_start == -1 or span_end == -1 or close_paren == -1:
    print("   ✗ Could not find span or closing paren!")
    sys.exit(1)

print(f"   ✓ Span: {span_start}-{span_end}, Close paren: {close_paren}")

# Show BEFORE (first 3 lines)
print("\n5. BEFORE replacement (first 3 lines around condition):")
print("-" * 80)
before_start = mobile_idx + cond_start
before_text = content[before_start:before_start+200]
before_lines = before_text.split('\n')[:3]
for i, line in enumerate(before_lines):
    print(f"   {i+1}: {line[:80]}")

# Build replacement
print("\n6. Building replacement...")
before = content[:mobile_idx + cond_start]
span_content = section[span_start:span_end+7]
after = content[mobile_idx + cond_start + close_paren + 2:]

indent = '                                              '
new_content = before + indent + span_content + '\n' + after

# Show AFTER (first 3 lines)
print("\n7. AFTER replacement (first 3 lines):")
print("-" * 80)
after_start = mobile_idx + cond_start
after_text = new_content[after_start:after_start+200]
after_lines = after_text.split('\n')[:3]
for i, line in enumerate(after_lines):
    print(f"   {i+1}: {line[:80]}")

# Count matches
matches_count = content.count(cond_pattern)
print(f"\n8. ✓ Найдено совпадений: {matches_count}")

# Write file
print("\n9. Writing file...")
try:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("   ✓ File written successfully")
except PermissionError as e:
    print(f"   ✗ Permission denied! Close the file in editor: {e}")
    sys.exit(1)
except Exception as e:
    print(f"   ✗ Error writing file: {e}")
    sys.exit(1)

# Verify
print("\n10. Verifying changes...")
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        verify_content = f.read()
    
    verify_section = verify_content[mobile_idx:mobile_idx+2500]
    if cond_pattern in verify_section:
        print("   ✗ VERIFICATION FAILED: Condition still present!")
        print("   This might mean the file is locked by editor.")
        sys.exit(1)
    else:
        print("   ✓ VERIFICATION SUCCESS: Condition removed!")
        print("   ✓ File successfully modified!")
except Exception as e:
    print(f"   ✗ Error verifying: {e}")
    sys.exit(1)

print("\n" + "=" * 80)
print("REPLACEMENT COMPLETED SUCCESSFULLY!")
print("=" * 80)


