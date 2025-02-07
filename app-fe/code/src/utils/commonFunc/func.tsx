import { notifications } from '@mantine/notifications';
import {
  IconAlertCircle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

export const showCustomNotification = (
  message: string,
  title?: string,
  type: NotificationType = 'info'
) => {
  let icon;
  let backgroundColor;
  let color;

  switch (type) {
    case 'success':
      icon = <IconCheck />;
      backgroundColor = '#DEFBE6';
      color = 'green';
      break;
    case 'error':
      icon = <IconX />;
      backgroundColor = '#f8d7da';
      color = 'red';
      break;
    case 'warning':
      icon = <IconAlertCircle size={18} />;
      backgroundColor = '#FFD7D9';
      color = 'yellow';
      break;
    case 'info':
    default:
      icon = <IconInfoCircle size={18} />;
      backgroundColor = '#d1ecf1';
      color = 'gray';
      break;
  }

  notifications.show({
    title,
    message,
    color,
    icon,
    autoClose: 3000, // Customize auto-close duration
    position: 'top-right',
    styles: () => ({
      root: {
        backgroundColor,
      },
      closeButton: {
        display: 'none',
      },
      icon: {
        marginRight: 8,
      },
    }),
  });
};

interface Domain {
  domainName: string;
  cnameName: string;
  type: string;
  cnameValue: string;
}
export const exportToCSV = async (domains: Domain[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Domains');

  // Thêm tiêu đề cột
  worksheet.columns = [
    { header: 'Domain name', key: 'domainName', width: 30 },
    { header: 'CNAME name', key: 'cnameName', width: 30 },
    { header: 'Type', key: 'type', width: 15 },
    { header: 'CNAME value', key: 'cnameValue', width: 30 },
  ];

  // Thêm dữ liệu vào worksheet
  domains.forEach((domain) => {
    worksheet.addRow(domain);
  });

  // Xuất file CSV
  const buffer = await workbook.csv.writeBuffer();
  const blob = new Blob([buffer], { type: 'text/csv;charset=utf-8;' });
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  // Tạo tên file với định dạng ListDomain+ ngày hiện tại
  const fileName = `ListDomain_${formattedDate}.csv`;
  saveAs(blob, fileName);
};
