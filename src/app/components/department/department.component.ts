import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../../services/account-service.service';
import {DepartmentServiceService} from '../../services/department-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { Department} from '../../models/department'
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department:any =[];
  Department: Department = new Department();
  infordata:any;
  rowId:any;
  pnotify = undefined;
  constructor(private router: Router,private account: AccountServiceService, pnotifyService: PnotifyService,private addDepartment: DepartmentServiceService) { 
    this.pnotify = pnotifyService.getPNotify();
  }
  onSubmit()
  {
    const token = localStorage.getItem('token');
    this.addDepartment.adddepartment(this.Department,token).then((data)=>{
      if(data.json().errorCode == 0 && data.json().status === 'successfully')
      {
        $('#department').modal('hide');
        this.pnotify.success({
          text: "Thêm Thành Công",
          delay:2000   
        });
        this.list_data_department();
      }
      else
      {
        this.pnotify.error({
          text: "Không thể thêm yêu cầu kiểm tra lại !",
          delay:2000   
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  Edit()
  {
    this.Department ={
      "dept":$('#dept2').val(),
      "dept_name":$('#dept_name2').val()

    }
    const token = localStorage.getItem('token');
    this.addDepartment.editdepartment(this.Department,token,self.rowId).then((data)=>{
      if(data.json().errorCode == 0 && data.json().status === 'successfully')
      {
        $('#department').modal('hide');
        this.pnotify.success({
          text: "Sửa Thành Công",
          delay:2000   
        });
        this.list_data_department();
      }
      else
      {
        this.pnotify.error({
          text: "Không thể sửa yêu cầu kiểm tra lại !",
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
  //lay du lieu department
  list_data_department(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.account.accountdepartment(token).then((account) => {
        console.log(account.json())
        if(account.json().errorCode==0)
        {
          this.department = account.json().data;
          tbl.clear().draw();
          tbl.rows.add(this.department); // Add new data
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
    $('.btn_add').click(function(){
      $('#department').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Khoa");
        $('#dept').val("");
        $('#dept_name').val("");
      }
    }) 
    $('#departmentedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var Id2=$('#hideId2').val();
      if(Id2==0)
      {
        $('.modal-title').text("Thêm Khoa");
        $('#dept2').val("");
        $('#dept_name2').val("");
      }
      else
      {
        $('.modal-title').text("Sửa Khoa");
        $('#dept2').val(self.infodata.dept);
        $('#dept_name2').val(self.infodata.dept_name);
       
      }
    });
    
    //add vao datatable
    tbl = $("#dataTable").DataTable({
      columnDefs: [
          { orderable: false, targets: [0,3] }
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
      rowId: "deptid",
      columns: [
        { data: null},
        { data: "dept" },  
        { data: "dept_name" },            
        { data: null,  render: function ( data, type, row ) {
          return '<i data-group="grpEdit" class="fa fa-check text-warning m-1 pointer" ></i>'+
          '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
        }}
      ],
      initComplete: function (settings, json) {
        self.list_data_department();
        //$("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
      },
      drawCallback: function( settings ) {
        self.bindTableEvents();
      }
    });

    tbl.on('order.dt search.dt', function () {
      tbl.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
      });
    }).draw();     
  }
   bindTableEvents()
  {
    $('#dataTable_wrapper').removeClass("container-fluid");
    $('i[data-group=grpEdit]').off('click').click(function(){
      const token = localStorage.getItem('token');
      self.rowId=$(this).closest('tr').attr('id');
      $('#hideId2').val(self.rowId);
      self.addDepartment.getdepartmentbyid(self.rowId,token).then(data=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
        {
          self.infodata = data.json().data;
          $('#departmentedit').modal("show");
        }
      });
      $(this).removeData('bs.modal');
  });
  $('i[data-group=grpDelete]').off('click').click(function(){
    const token = localStorage.getItem('token');
    self.rowId=$(this).closest('tr').attr('id');
    $.confirm({
      title:"Thông báo !",
      content: 'Bạn có chắc muốn xóa ?',
      buttons: {
          info: {
            text: 'Xóa',
            btnClass: 'btn-red',
              action: function(){
                self.addDepartment.deletedepartment(self.rowId,token).then(data=>{
                    if(data.json().errorCode==0 && data.json().status === 'successfully')
                    {
                      self.pnotify.success({
                        text: "Xóa Thành Công",
                        delay:2000   
                      });
                      self.list_data_department();
                    }
                    else
                    {
                      self.pnotify.error({
                        text: "Không thể xóa.Yêu cầu kiểm tra dữ liệu ràng buộc !",
                        delay:2000   
                      });
                    }
                });
            }
          },
          danger: {
            text: 'Hủy',
            btnClass: 'btn-default', // multiple classes.
            action:function(){
            }
          }
      }
    });
  });
}

}
