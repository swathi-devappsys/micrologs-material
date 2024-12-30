import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {DatePipe, TitleCasePipe} from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {ResizableModule} from 'angular-resizable-element';

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
  jsonData: string;
}

@Component({
  selector: 'app-raw-logs',
  templateUrl: './upload-logs.component.html',
  imports: [
    MatButton,
    MatCard,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatFormField,
    MatInput,
    TitleCasePipe,
    FormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatIcon,
    MatIconButton,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    FlexModule,ResizableModule
  ],
  styleUrls: ['./upload-logs.component.css'],
  providers: [DatePipe]
})
export class UploadLogsComponent implements OnInit {
  @Input() theme: 'white' | 'primary' = 'white';

  displayedColumns: string[] = [
    'clientID',
    'deviceID',
    'durationNano',
    'logTime',
    'logType',
    'mnemonic',
    'status',
    'surveyUUID',
    'userId',
    'jsonData',
  ];

  dataSource = new MatTableDataSource<LogData>();

  pageSize = 10;
  currentPage = 0;

  columnFilters: { [key: string]: string } = {};
  filterOptions: { [key: string]: string[] } = {};
  columnWidths: { [key: string]: number } = {};
   loadData(){
     this.dataSource.data=[
       {
         clientID: 'C123',
         deviceID: 'D456',
         durationNano: 123456789,
         logTime: '2024-12-29T10:00:00Z',
         logType: 1,
         mnemonic: 'LOG1',
         status: 200,
         surveyUUID: 'abc123',
         userId: 'user01',
         jsonData: '{"key1":"value1","key2":"value2"}'
       },
       {
         clientID: 'C124',
         deviceID: 'D457',
         durationNano: 987654321,
         logTime: '2024-12-29T11:00:00Z',
         logType: 2,
         mnemonic: 'LOG2',
         status: 500,
         surveyUUID: 'abc124',
         userId: 'user02',
         jsonData: '{"key3":"value3","key4":"value4"}'
       },
       {
         clientID: 'C125',
         deviceID: 'D458',
         durationNano: 654987321,
         logTime: '2024-12-29T12:00:00Z',
         logType: 3,
         mnemonic: 'LOG3',
         status: 404,
         surveyUUID: 'abc125',
         userId: 'user03',
         jsonData: '{"key5":"value5","key6":"value6"}'
       }
     ];

   }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,private datePipe:DatePipe) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns.forEach(column => {
      this.columnFilters[column] = '';
      this.columnWidths[column] = 200;
    })

    this.loadData();

    this.updateFilterOptions();

    this.setupFilterPredicate();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.currentPage = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadData();
    })

    this.paginator.page.subscribe(() => {
      this.currentPage = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.loadData();
    })


  }
  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: LogData, filter: string) => {
      const filters = JSON.parse(filter);
      return Object.keys(filters).every(key => {
        const value = filters[key].toLowerCase();
        if (!value) return true;

        const dataValue = data[key as keyof LogData];
        if (dataValue === null || dataValue === undefined) return false;

        return dataValue.toString().toLowerCase().includes(value);
      });
    };
  }

  updateFilterOptions(): void {
    const data = this.dataSource.data;

    // Iterate through each column and extract unique values for each
    this.displayedColumns.forEach(column => {
      if (column !== 'jsonData') {  // We don't need to filter jsonData, as it's non-filterable
        const uniqueValues = Array.from(new Set(data.map(item => item[column as keyof LogData]?.toString())));
        this.filterOptions[column] = uniqueValues.filter(value => value);  // Remove undefined or null values
      }
    });
  }

  applyFilters(): void {
    this.paginator.pageIndex = 0;

    this.dataSource.filter = JSON.stringify(this.columnFilters );
    console.log(this.dataSource);


  }

  clearFilters(): void {
   this.columnFilters={}
    this.applyFilters();
  }

  clearFilter(column: string): void {
    this.columnFilters[column] = '';
    this.applyFilters()
  }

  formatCellValue(column: string, value: any): string {
    return value ?? '-';
  }

  openJsonDialog(jsonData: string): void {
    this.dialog.open(JsonDialogComponent, {
      data: { jsonData }
    });
  }

  applyGlobalSearch(): void {
    this.applyFilters();
  }

  onResize($event: UIEvent, column: string) {
    const width = ($event.target as HTMLDivElement).offsetWidth;
    this.columnWidths[column] = width;
    console.log(this.columnWidths);
  }
}

/* ---------------- JSON Dialog Component ---------------- */

@Component({
  selector: 'app-json-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton
  ],
  template: `
    <h2 mat-dialog-title>JSON Data</h2>
    <mat-dialog-content>
      <pre>{{ data.jsonData }}</pre>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `
})
export class JsonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JsonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jsonData: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
