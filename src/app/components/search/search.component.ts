import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../../services/account-service.service';
import { StudentServiceService } from '../../services/student-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { Student} from '../../models/student';
import { DepartmentServiceService } from '../../services/department-service.service';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-student',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
    this.list_data_department();
    this.listDataCourse();
  }
  onSubmit()
  {
    this.Student ={
      "deptid":$('#department').val(),
    }
    const token = localStorage.getItem('token');
    this.addstudent.getAllDataByCondition(this.Student,token).then((data)=>{
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

  //tro ve trang chu
  backhome()
  {
    this.router.navigate(['/home']);  
  }
  //dang xuat
  logout()
  {
    this.router.navigateByUrl('/login');
  }
  //lay du lieu khoa
  list_data_department(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.account.accountdepartment(token).then((account) => {
        if(account.json().errorCode==0)
        {
          this.department = account.json().data;
        }
        else if(account.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
//lay du lieu khoa hoc
public listDataCourse() {
  const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.course.getCourseData(token).then((account) => {
        if(account.json().errorCode==0)
        {
          this.courseData = account.json().data;
        }
        else if(account.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
  //lay du lieu student
  list_data_student(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.addstudent.getAllData(token).then((account) => {

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
    self=this;
    $('#department').select2();
    $('.btn_add').click(function(){
      $('#student').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Lọc Sinh Viên");
        $('#department').val("");
      }
    }) 
    $('#studentedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var Id2=$('#hideId2').val();
      if(Id2==0)
      {
        $('.modal-title').text("Lọc Sinh Viên");
        $('#username').val("");
        $('#active').val("");
      }
      else
      {
        $('.modal-title').text("Sửa Sinh Viên");
        $('#active2').val(self.infodata.active).change();
    
      }
    });
    //add vao datatable
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
        { data: "sex" },
        { data: "email" },
        { data: "dept_name" },
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
        { data: "dcname" },
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
