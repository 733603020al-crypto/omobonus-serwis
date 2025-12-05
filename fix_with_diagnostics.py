#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'

print("=" * 80)
print("DIAGNOSTICS: Mobile prices fix")
print("=" * 80)

# Step 1: Read file and find mobile section
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("\n1. Searching for mobile section comment...")
mobile_line_idx = -1
for i, line in enumerate(lines):
    if '{/* Цены справа - только на мобильных */}' in line:
        mobile_line_idx = i
        print(f"   ✓ Found at line {i+1}")
        break

if mobile_line_idx == -1:
    print("   ✗ Mobile comment NOT FOUND!")
    exit(1)

# Step 2: Show context around mobile section
print("\n2. Context around mobile section (lines before and after):")
print("-" * 80)
context_start = max(0, mobile_line_idx - 2)
context_end = min(len(lines), mobile_line_idx + 25)
for j in range(context_start, context_end):
    marker = ">>>" if j == mobile_line_idx else "   "
    print(f"{marker} {j+1:4d}: {lines[j].rstrip()}")

# Step 3: Find the condition
print("\n3. Searching for condition 'isSubcategoryOpen(section.id, subcategory.id) &&'...")
condition_line_idx = -1
for j in range(mobile_line_idx + 1, min(mobile_line_idx + 30, len(lines))):
    if 'isSubcategoryOpen(section.id, subcategory.id) &&' in lines[j]:
        condition_line_idx = j
        print(f"   ✓ Found at line {j+1}")
        print(f"   Line content: {lines[j].rstrip()[:80]}")
        break

if condition_line_idx == -1:
    print("   ✗ Condition NOT FOUND in mobile section!")
    exit(1)

# Step 4: Show the exact block that needs to be replaced
print("\n4. Exact block to be replaced (lines 1610-1617):")
print("-" * 80)
for j in range(condition_line_idx, min(condition_line_idx + 8, len(lines))):
    print(f"   {j+1:4d}: {lines[j].rstrip()}")

# Step 5: Perform replacement
print("\n5. Performing replacement...")
indent = ' ' * (len(lines[condition_line_idx]) - len(lines[condition_line_idx].lstrip()))
print(f"   Detected indentation: {len(indent)} spaces")

# Find where zł is
zł_line_idx = -1
for j in range(condition_line_idx + 1, min(condition_line_idx + 10, len(lines))):
    if 'zł' in lines[j]:
        zł_line_idx = j
        break

if zł_line_idx == -1:
    print("   ✗ 'zł' text NOT FOUND!")
    exit(1)

# Find closing paren
close_paren_idx = -1
for j in range(zł_line_idx + 1, min(zł_line_idx + 5, len(lines))):
    if ')}' in lines[j]:
        close_paren_idx = j
        break

if close_paren_idx == -1:
    print("   ✗ Closing ')}' NOT FOUND!")
    exit(1)

# Build new lines
new_lines = lines[:condition_line_idx]
new_lines.append(indent + '<span\n')
new_lines.append(indent + '  className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex"\n')
new_lines.append(indent + '  style={{ textShadow: supplementTextShadow, marginTop: ''-3px'' }}\n')
new_lines.append(indent + '>\n')
new_lines.append(indent + '  zł\n')
new_lines.append(indent + '</span>\n')
new_lines.extend(lines[close_paren_idx + 1:])

print(f"   ✓ Replacement prepared: removed lines {condition_line_idx+1} to {close_paren_idx+1}")
print(f"   ✓ Added new span block with always-visible 'zł'")

# Step 6: Show after replacement
print("\n6. Context after replacement:")
print("-" * 80)
new_context_start = max(0, condition_line_idx - 2)
new_context_end = min(len(new_lines), condition_line_idx + 10)
for j in range(new_context_start, new_context_end):
    marker = ">>>" if j >= condition_line_idx and j < condition_line_idx + 6 else "   "
    print(f"{marker} {j+1:4d}: {new_lines[j].rstrip()}")

# Step 7: Write file
print("\n7. Writing changes to file...")
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("   ✓ File updated successfully!")

print("\n" + "=" * 80)
print("REPLACEMENT COMPLETED!")
print("=" * 80)


