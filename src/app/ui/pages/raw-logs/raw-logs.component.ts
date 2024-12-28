// raw-logs.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import {CommonModule, DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

export interface LogData {
  clientID: string;
  deviceID: string;
  durationNano: number;
  logTime: string;
  logType: number;
  mnemonic: string;
  status: number;
  surveyUUID: string;
  userId: string;
}

@Component({
  selector: 'app-raw-logs',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButton,
    NgClass,
    MatCard,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatFormField,
    TitleCasePipe,
    MatInput,
    MatIconButton,
    FormsModule,
    MatIcon,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator,
    MatRowDef,
  ],
  templateUrl: './raw-logs.component.html',
  styleUrls: ['./raw-logs.component.css'],
  providers: [DatePipe]
})
export class RawLogsComponent implements OnInit, AfterViewInit {
  @Input() theme: 'white' | 'primary' = 'white';

  displayedColumns: string[] = [
    'select',
    'clientID',
    'deviceID',
    'durationNano',
    'logTime',
    'logType',
    'mnemonic',
    'status',
    'surveyUUID',
    'userId',
    'actions'
  ];

  dataSource = new MatTableDataSource<LogData>();
  selection = new SelectionModel<LogData>(true, []);
  columnFilters: { [key: string]: string } = {};
  isLoading = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Initialize filters
    this.displayedColumns.forEach(column => {
      if (column !== 'select' && column !== 'actions') {
        this.columnFilters[column] = '';
      }
    });

    // Example data - replace with your API call
    this.loadData();
    this.setupFilterPredicate();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Sort change subscription
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadData();
    });

    // Page change subscription
    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadData();
    });
  }

  private loadData(): void {
    this.isLoading = true;

    // Example data - replace with your API call
    const exampleData: LogData[] = [
      {
        clientID: 'STYRA_PRO_BETA',
        deviceID: 'c256a29fb318f8d5',
        durationNano: 0,
        logTime: '2024-12-01 00:43:17.916',
        logType: 0,
        mnemonic: 'SSTD',
        status: 0,
        surveyUUID: '',
        userId: '3838',
      },
      {
        clientID: 'STYRA_PRO_ALPHA',
        deviceID: 'a256a29fb318f8d5',
        durationNano: 100,
        logTime: '2024-12-02 01:20:00.000',
        logType: 1,
        mnemonic: 'ALPHA',
        status: 1,
        surveyUUID: 'UUID_123',
        userId: '1234',
      },
    ];

    this.dataSource.data = exampleData;
    this.totalRows = exampleData.length;
    this.isLoading = false;
  }

  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: LogData, filter: string) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key => {
        const value = filters[key].toLowerCase();
        if (!value) return true;

        const dataValue = data[key as keyof LogData];
        if (dataValue === null || dataValue === undefined) return false;

        if (key === 'logTime') {
          const formattedDate = this.datePipe.transform(dataValue, 'yyyy-MM-dd HH:mm:ss');
          return formattedDate?.toLowerCase().includes(value);
        }

        return dataValue.toString().toLowerCase().includes(value);
      });
    };
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: LogData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  applyFilters(): void {
    this.paginator.pageIndex = 0;
    this.dataSource.filter = JSON.stringify(this.columnFilters);
  }

  clearFilters(): void {
    Object.keys(this.columnFilters).forEach(key => {
      this.columnFilters[key] = '';
    });
    this.applyFilters();
  }

  clearFilter(column: string): void {
    this.columnFilters[column] = '';
    this.applyFilters();
  }

  getCellClass(column: string, value: any): string {
    if (column === 'status') {
      return `status-cell status-${value}`;
    }
    if (column === 'logType') {
      return `log-type-cell log-type-${value}`;
    }
    return '';
  }

  formatCellValue(column: string, value: any): string {
    if (!value && value !== 0) return '';

    switch (column) {
      case 'durationNano':
        return `${value.toLocaleString()} ns`;
      case 'logTime':
        return this.datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss.SSS') || '';
      case 'status':
        return this.getStatusLabel(value);
      case 'logType':
        return this.getLogTypeLabel(value);
      default:
        return value.toString();
    }
  }

  getStatusLabel(status: number): string {
    const statusMap: { [key: number]: string } = {
      0: 'Success',
      1: 'Warning',
      2: 'Error'
    };
    return statusMap[status] || `Unknown (${status})`;
  }

  getLogTypeLabel(logType: number): string {
    const logTypeMap: { [key: number]: string } = {
      0: 'Info',
      1: 'Debug'
    };
    return logTypeMap[logType] || `Unknown (${logType})`;
  }

  exportToCSV(): void {
    const data = this.selection.selected.length > 0
      ? this.selection.selected
      : this.dataSource.filteredData;

    const headers = this.displayedColumns
      .filter(col => col !== 'select' && col !== 'actions')
      .map(col => col.charAt(0).toUpperCase() + col.slice(1));

    const rows = data.map(row =>
      this.displayedColumns
        .filter(col => col !== 'select' && col !== 'actions')
        .map(col => this.formatCellValue(col, row[col as keyof LogData]))
    );

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `raw_logs_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onRowClick(row: LogData): void {
    // Implement row click handler if needed
    console.log('Row clicked:', row);
  }

  viewDetails(row: LogData): void {
    // Implement view details dialog
    console.log('View details:', row);
  }

  refresh(): void {
    this.loadData();
  }
}
