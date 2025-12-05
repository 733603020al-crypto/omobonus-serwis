#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys

file_path = 'src/app/uslugi/service-accordion.tsx'

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

print("=" * 80)
print("DIAGNOSTICS: Mobile prices fix")
print("=" * 80)

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("\n1. Searching for mobile section...")
mobile_idx = -1
for i, line in enumerate(lines):
    if 'Цены справа - только на мобильных' in line:
        mobile_idx = i
        print(f"   ✓ Found at line {i+1}")
        break

if mobile_idx == -1:
    print("   ✗ NOT FOUND!")
    sys.exit(1)

print("\n2. Context (lines 1598-1625):")
print("-" * 80)
for j in range(max(0, mobile_idx-2), min(len(lines), mobile_idx+25)):
    marker = ">>>" if j == mobile_idx else "   "
    print(f"{marker} {j+1:4d}: {lines[j].rstrip()}")

print("\n3. Finding condition...")
cond_idx = -1
for j in range(mobile_idx+1, min(mobile_idx+30, len(lines))):
    if 'isSubcategoryOpen(section.id, subcategory.id) &&' in lines[j]:
        cond_idx = j
        print(f"   ✓ Found at line {j+1}")
        break

if cond_idx == -1:
    print("   ✗ NOT FOUND!")
    sys.exit(1)

print("\n4. Block to replace (lines 1610-1617):")
print("-" * 80)
for j in range(cond_idx, min(cond_idx+8, len(lines))):
    print(f"   {j+1:4d}: {lines[j].rstrip()}")

print("\n5. Performing replacement...")
indent = ' ' * (len(lines[cond_idx]) - len(lines[cond_idx].lstrip()))
print(f"   Indent: {len(indent)} spaces")

# Find closing paren
close_idx = -1
for j in range(cond_idx+1, min(cond_idx+10, len(lines))):
    if ')}' in lines[j] and j > cond_idx+5:
        close_idx = j
        break

if close_idx == -1:
    print("   ✗ Closing paren NOT FOUND!")
    sys.exit(1)

# Build replacement
new_lines = lines[:cond_idx]
new_lines.append(indent + '<span\n')
new_lines.append(indent + '  className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex"\n')
new_lines.append(indent + '  style={{ textShadow: supplementTextShadow, marginTop: ''-3px'' }}\n')
new_lines.append(indent + '>\n')
new_lines.append(indent + '  zł\n')
new_lines.append(indent + '</span>\n')
new_lines.extend(lines[close_idx+1:])

print(f"   ✓ Replaced lines {cond_idx+1}-{close_idx+1}")

print("\n6. After replacement (lines 1608-1618):")
print("-" * 80)
for j in range(max(0, cond_idx-2), min(len(new_lines), cond_idx+10)):
    marker = ">>>" if cond_idx <= j < cond_idx+6 else "   "
    print(f"{marker} {j+1:4d}: {new_lines[j].rstrip()}")

print("\n7. Writing file...")
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("   ✓ DONE!")

print("\n" + "=" * 80)


