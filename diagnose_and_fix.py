#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = 'src/app/uslugi/service-accordion.tsx'
log_path = 'fix_diagnosis.txt'

with open(log_path, 'w', encoding='utf-8') as log:
    log.write("=" * 80 + "\n")
    log.write("DIAGNOSTICS AND FIX\n")
    log.write("=" * 80 + "\n\n")
    
    # Read file
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    log.write(f"1. File read: {len(lines)} lines\n\n")
    
    # Find mobile section
    mobile_idx = None
    for i, line in enumerate(lines):
        if '{/* Цены справа - только на мобильных */}' in line:
            mobile_idx = i
            log.write(f"2. Mobile comment found at line {i+1}\n\n")
            break
    
    if mobile_idx is None:
        log.write("ERROR: Mobile comment NOT FOUND!\n")
        exit(1)
    
    # Find condition
    cond_idx = None
    for i in range(mobile_idx + 1, min(mobile_idx + 30, len(lines))):
        if 'isSubcategoryOpen(section.id, subcategory.id) &&' in lines[i]:
            cond_idx = i
            log.write(f"3. Condition found at line {i+1}\n")
            log.write(f"   Content: {lines[i].rstrip()}\n\n")
            break
    
    if cond_idx is None:
        log.write("ERROR: Condition NOT FOUND!\n")
        exit(1)
    
    # Find closing paren
    close_idx = None
    for i in range(cond_idx + 1, min(cond_idx + 10, len(lines))):
        if ')}' in lines[i]:
            close_idx = i
            log.write(f"4. Closing paren found at line {i+1}\n")
            log.write(f"   Content: {lines[i].rstrip()}\n\n")
            break
    
    if close_idx is None:
        log.write("ERROR: Closing paren NOT FOUND!\n")
        exit(1)
    
    # Show BEFORE
    log.write("5. BEFORE replacement (lines 1608-1618):\n")
    log.write("-" * 80 + "\n")
    for i in range(cond_idx - 1, min(cond_idx + 9, len(lines))):
        log.write(f"   {i+1:4d}: {lines[i].rstrip()}\n")
    log.write("\n")
    
    # Get indentation
    indent = ' ' * (len(lines[cond_idx]) - len(lines[cond_idx].lstrip()))
    log.write(f"6. Indentation: {len(indent)} spaces\n\n")
    
    # Build new content
    new_lines = lines[:cond_idx]
    new_lines.append(indent + '<span\n')
    new_lines.append(indent + '  className="font-table-sub text-[16px] text-[#ede0c4] leading-[1.3] ml-0.5 inline-flex"\n')
    new_lines.append(indent + '  style={{ textShadow: supplementTextShadow, marginTop: ''-3px'' }}\n')
    new_lines.append(indent + '>\n')
    new_lines.append(indent + '  zł\n')
    new_lines.append(indent + '</span>\n')
    new_lines.extend(lines[close_idx + 1:])
    
    log.write(f"7. Replacement: removed lines {cond_idx+1}-{close_idx+1}, added 6 new lines\n\n")
    
    # Show AFTER
    log.write("8. AFTER replacement (lines 1608-1618):\n")
    log.write("-" * 80 + "\n")
    for i in range(cond_idx - 1, min(cond_idx + 9, len(new_lines))):
        log.write(f"   {i+1:4d}: {new_lines[i].rstrip()}\n")
    log.write("\n")
    
    # Write file
    log.write("9. Writing file...\n")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    log.write("   SUCCESS!\n\n")
    
    # Verify
    log.write("10. Verification:\n")
    with open(file_path, 'r', encoding='utf-8') as f:
        verify_lines = f.readlines()
    if cond_idx < len(verify_lines):
        log.write(f"   Line {cond_idx+1}: {verify_lines[cond_idx].rstrip()}\n")
        if 'isSubcategoryOpen' not in verify_lines[cond_idx]:
            log.write("   ✓ Condition successfully removed!\n")
        else:
            log.write("   ✗ Condition still present - REPLACEMENT FAILED!\n")

print(f"Diagnostics written to {log_path}")


