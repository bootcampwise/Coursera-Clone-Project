const fs = require('fs');
const path = require('path');

const colorMappings = {
  '#0056D2': 'primary',
  '#00419e': 'primary-hover',
  '#E6F0FF': 'primary-light',
  '#382d8b': 'secondary',
  '#FFFFFF': 'white',
  '#F5F7F8': 'surface',
  '#F0F4F8': 'surface-hover',
  '#1f1f1f': 'gray-dark-3',
  '#475569': 'text-secondary',
  '#94A3B8': 'text-muted',
  '#5f6368': 'text-gray',
  '#1E1014': 'text-dark',
  '#1D161A': 'text-darker',
  '#1A181F': 'text-darkest',
  '#616B8B': 'text-secondary-dark',
  '#62688A': 'text-muted-dark',
  '#3E4A6D': 'text-muted-2',
  '#7A899F': 'text-muted-3',
  '#E1E1E1': 'border',
  '#F1F5F9': 'border-light',
  '#CBD5E1': 'border-dark',
  '#e1e6f0': 'border-custom',
  '#121A37': 'bg-light',
  '#F2F5FA': 'bg-profile',
  '#F3F6FB': 'bg-light-blue',
  '#0E164E': 'blue-dark',
  '#155ED3': 'blue-medium',
  '#0459D5': 'blue-medium-2',
  '#0661D6': 'blue-medium-3',
  '#0162D7': 'blue-medium-4',
  '#046BD9': 'blue-medium-5',
  '#10B981': 'success',
  '#F59E0B': 'warning',
  '#EF4444': 'error',
  '#c02626': 'error-custom',
  '#3B82F6': 'info',
  '#CBD5E1': 'scrollbar-bg',
  '#94A3B8': 'scrollbar-hover',
  '#E5E7EB': 'scrollbar-custom',
  '#D1D5DB': 'scrollbar-custom-hover',
  '#F2D049': 'yellow-icon',
  '#F44336': 'avatar-red',
  '#E91E63': 'avatar-pink',
  '#9C27B0': 'avatar-purple',
  '#673AB7': 'avatar-deep-purple',
  '#3F51B5': 'avatar-indigo',
  '#2196F3': 'avatar-blue',
  '#03A9F4': 'avatar-light-blue',
  '#00BCD4': 'avatar-cyan',
  '#009688': 'avatar-teal',
  '#4CAF50': 'avatar-green',
  '#8BC34A': 'avatar-light-green',
  '#CDDC39': 'avatar-lime',
  '#FFEB3B': 'avatar-yellow',
  '#FFC107': 'avatar-amber',
  '#FF9800': 'avatar-orange',
  '#FF5722': 'avatar-deep-orange',
  '#795548': 'avatar-brown',
  '#9E9E9E': 'avatar-gray',
  '#607D8B': 'avatar-blue-gray',
  '#A64AC9': 'avatar-purple-accent',
  '#ccc': 'stroke-light-gray',
  '#e0e0e0': 'stroke-border',
  '#1877F2': 'facebook-blue',
  '#1a73e8': 'google-blue',
  '#1a4f88': 'google-blue-dark',
  '#1557b0': 'google-blue-darker',
  '#0B5FFF': 'spinner-blue',
  '#4c5a8a': 'shade-1',
  '#636363': 'shade-2',
  '#202225': 'shade-3',
  '#201114': 'shade-4',
  '#0E1B29': 'shade-5',
  '#202124': 'shade-6',
  '#3c4043': 'shade-7',
  '#4b5677': 'shade-8',
  '#6a7390': 'shade-9',
  '#6b7695': 'shade-10',
  '#3f4b6b': 'shade-11',
  '#70757a': 'shade-12',
  '#111727': 'shade-13',
  '#F2F6FD': 'blue-light',
  '#f0f7ff': 'blue-light-2',
  '#e8f0fe': 'blue-light-3',
  '#2f3a4a': 'gray-dark-1',
  '#1A1C1F': 'gray-dark-2',
  '#000000': 'gray-dark-4',
  '#266ED8': 'gray-medium-1',
  '#dfe3eb': 'gray-medium-2',
  '#d4dae6': 'gray-medium-3',
  '#dadce0': 'gray-medium-4',
  '#f4f7fc': 'gray-light-1',
  '#f6f8fc': 'gray-light-2',
  '#188038': 'success-dark',
  '#1f8354': 'success-medium',
  '#e6f4ea': 'success-light',
  '#f5c22b': 'yellow-accent',
};

function replaceHexInText(text) {
  let result = text;
  
  for (const [hex, colorName] of Object.entries(colorMappings)) {
    const patterns = [
      new RegExp(`\\[${hex}\\]`, 'gi'),
      new RegExp(`"${hex}"`, 'gi'),
      new RegExp(`'${hex}'`, 'gi'),
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(result)) {
        result = result.replace(pattern, (match) => {
          if (match.startsWith('[')) {
            return `[rgb(var(--color-${colorName}))]`;
          } else if (match.includes('"')) {
            return `var(--color-${colorName})`;
          } else {
            return `var(--color-${colorName})`;
          }
        });
      }
    }
  }
  
  return result;
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next' && file !== '.vite' && file !== 'dist') {
        getAllFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (['.ts', '.tsx', '.js', '.jsx', '.css'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

const projectRoot = 'd:\\Bootcamp projects\\coursera-clone\\frontend';
const files = getAllFiles(projectRoot);

console.log(`Found ${files.length} files to process`);

let processedCount = 0;
let changesCount = 0;

files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const replaced = replaceHexInText(content);
    
    if (content !== replaced) {
      fs.writeFileSync(filePath, replaced, 'utf8');
      changesCount++;
      console.log(`✓ Updated: ${filePath.replace(projectRoot, '')}`);
    }
    processedCount++;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
  }
});

console.log(`\nCompleted!`);
console.log(`Files processed: ${processedCount}`);
console.log(`Files with changes: ${changesCount}`);
