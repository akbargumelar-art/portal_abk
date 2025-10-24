// utils/export.ts
export const exportToCsv = (data: Record<string, any>[], filename: string) => {
  if (!data || data.length === 0) {
    throw new Error("No data available to export.");
  }

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      // Ensure value is a string, handle null/undefined
      const stringValue = row[header] === null || row[header] === undefined ? '' : String(row[header]);
      // Escape double quotes by doubling them
      const escaped = stringValue.replace(/"/g, '""');
      // Enclose in double quotes if it contains a comma, double quote, or newline
      if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
        return `"${escaped}"`;
      }
      return escaped;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
