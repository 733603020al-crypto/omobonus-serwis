#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'

print("=" * 80)
print("FINAL FIX WITH DIAGNOSTICS")
print("=" * 80)

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"\n1. File read: {len(lines)} lines total")

# Find mobile section
mobile_idx = None
for i, line in enumerate(lines):
    if '{/* Цены справа - только на мобильных */}' in line:
        mobile_idx = i
        print(f"   ✓ Mobile comment found at line {i+1}")
        break

if mobile_idx is None:
    print("   ✗ Mobile comment NOT FOUND!")
    exit(1)

# Find condition
cond_idx = None
for i in range(mobile_idx + 1, min(mobile_idx + 30, len(lines))):
    if 'isSubcategoryOpen(section.id, subcategory.id) &&' in lines[i]:
        cond_idx = i
        print(f"   ✓ Condition found at line {i+1}")
        break

if cond_idx is None:
    print("   ✗ Condition NOT FOUND!")
    exit(1)

# Find closing paren
close_idx = None
for i in range(cond_idx + 1, min(cond_idx + 10, len(lines))):
    if ')}' in lines[i] and i > cond_idx + 5:
        close_idx = i
        print(f"   ✓ Closing paren found at line {i+1}")
        break

if close_idx is None:
    print("   ✗ Closing paren NOT FOUND!")
    exit(1)

print("\n2. BEFORE replacement (lines 1608-1618):")
print("-" * 80)
for i in range(cond_idx - 1, min(cond_idx + 9, len(lines))):
    print(f"   {i+1:4d}: {lines[i].rstrip()}")

# Get indentation
indent = ' ' * (len(lines[cond_idx]) - len(lines[cond_idx].lstrip()))
print(f"\n3. Indentation detected: {len(indent)} spaces")

# Build new content
new_lines = lines[:cond_idx]
new_lines.append(indent + '<span\n')
new_lines.append(indent + '  className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex"\n')
new_lines.append(indent + '  style={{ textShadow: supplementTextShadow, marginTop: ''-3px'' }}\n')
new_lines.append(indent + '>\n')
new_lines.append(indent + '  zł\n')
new_lines.append(indent + '</span>\n')
new_lines.extend(lines[close_idx + 1:])

print(f"\n4. Replacement: removed lines {cond_idx+1}-{close_idx+1}, added 6 new lines")

print("\n5. AFTER replacement (lines 1608-1618):")
print("-" * 80)
for i in range(cond_idx - 1, min(cond_idx + 9, len(new_lines))):
    print(f"   {i+1:4d}: {new_lines[i].rstrip()}")

# Write file
print("\n6. Writing file...")
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("   ✓ File written successfully!")
print("\n" + "=" * 80)
print("REPLACEMENT COMPLETED!")
print("=" * 80)


