import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../../services/account-service.service';
import { StudentServiceService } from '../../services/student-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { Student} from '../../models/student';
import { DepartmentServiceService } from '../../services/department-service.service';
import * as moment from 'moment';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-search-by-marks',
  templateUrl: './search-by-marks.component.html',
  styleUrls: ['./search-by-marks.component.css']
})
export class SearchByMarksComponent implements OnInit {
  student:any =[];
  department:any =[];
  infordata:any;
  rowId:any;
  Student: Student = new Student();
  pnotify = undefined;
  courseData: any = [];
  constructor(
    private router: Router,
    private account: AccountServiceService,
    private addstudent:StudentServiceService, 
    public pnotifyService: PnotifyService,
    public course: DepartmentServiceService
  ) { 
    this.pnotify = pnotifyService.getPNotify();
  }

  onSubmit()
  {
    this.Student ={
      "min":$('#min').val(),
      "max":$('#max').val(),
    }
    const token = localStorage.getItem('token');
    this.addstudent.getAllDataByConditionMarks(this.Student,token).then((data)=>{
      if(data.json().errorCode == 0 && data.json().status === 'successfully')
      {
        this.student = data.json().data;
        tbl.clear().draw();
        tbl.rows.add(this.student); // Add new data
        tbl.columns.adjust().draw(); // Redraw the DataTable
      }
      else if(data.json().status === 'fail') {
        this.logout();
      } else
      {
        this.pnotify.error({
          text: "Không có dữ liệu yêu cầu lọc điều kiện khác !",
          delay:2000   
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  backhome()
  {
    this.router.navigate(['/home']);  
  }

  //dang xuat
  logout()
  {
    this.router.navigateByUrl('/login');
  }
  list_data_student(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.addstudent.getAllDataByConditionMark(token).then((account) => {

        if(account.json().errorCode==0)
        {
          this.student = account.json().data;
          tbl.clear().draw();
          tbl.rows.add(this.student); // Add new data
          tbl.columns.adjust().draw(); // Redraw the DataTable
        }
        else if(account.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(account.json().status==='nodata')
        {
          this.pnotify.error({
            text: "Không có dữ liệu cần xem.",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}

  ngOnInit() {
    self = this;
    $('.btn_add').click(function(){
      $('#student').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Lọc Sinh Viên");
      }
    }) 
    tbl = $("#dataTable").DataTable({
      columnDefs: [
          { orderable: false, targets: [0,7] }
      ],
      aLengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "All"]
      ],
      language: {
        "sProcessing":   "Đang xử lý...",
        "sLengthMenu":   "Xem _MENU_ mục",
        "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
        "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
        "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
        "sInfoFiltered": "(được lọc từ _MAX_ mục)",
        "sInfoPostFix":  "",
        "sSearch":       "Tìm:",
        "sUrl":          "",
        "oPaginate": {
            "sFirst":    "Đầu",
            "sPrevious": "Trước",
            "sNext":     "Tiếp",
            "sLast":     "Cuối"
        }
      },
      iDisplayLength: 10,
      order: [[1, "asc"]],
      rowId: "uid",
      columns: [
        { data: null},
        { data: "username" },  
        { data: "fullname" },            
        { data: "dept_name" },
        { data: "dcname" },
        { data: "marks" },
        { data: "testdate" ,render: function(data){
          return moment(data).format("DD/MM/YYYY HH:mm:ss");
        }},    
        {data: "active",render:function(data){
          if(data == 0)
          {
            return 'Đang hoạt động'
          }
          else
          {
            return 'Nghỉ'
          }
        }},
      
      ],
      initComplete: function (settings, json) {
        self.list_data_student();
        //$("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
      },
    });

    tbl.on('order.dt search.dt', function () {
      tbl.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
      });
    }).draw(); 
  }


}
