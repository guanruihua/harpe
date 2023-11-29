import type { ObjectType } from 'abandonjs';

export function writeJsonFile(dataSource: ObjectType, fileName: string = 'temp.json') {
  const content = JSON.stringify(dataSource);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  // 模拟点击下载链接
  link.click();

  // 释放 URL 对象
  URL.revokeObjectURL(url);
}