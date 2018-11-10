import { Component, OnInit } from '@angular/core';
import {DepartmentServiceService} from '../../services/department-service.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  pnotify = undefined;
  public courseData: any = [];
  courseName: any;
  description: any;
  constructor(private router: Router, 
              public pnotifyService: PnotifyService,
              private course: DepartmentServiceService) { 
    this.pnotify = pnotifyService.getPNotify();
  }

  public backhome()
  {
    this.router.navigate(['/home']);  
  }
  //dang xuat
  public logout()
  {
    this.router.navigateByUrl('/login');
  }

  public listData(){
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.course.getCourseData(token).then((res) => {
        if(res.json().errorCode==0)
        {
          this.courseData = res.json().data;
          tbl.clear().draw();
          tbl.rows.add(this.courseData); // Add new data
          tbl.columns.adjust().draw(); // Redraw the DataTable
        }
        else if(res.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
        else if(res.json().status==='nodata')
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

  public onSubmit()
  {
    const token = localStorage.getItem('token');
    const data = {
      dcname: this.courseName,
      dcdetail: this.description
    }
    this.course.addCourse(data ,token).then((res)=>{
      if(res.json().errorCode == 0 && res.json().status === 'successfully')
      {
        $('#department').modal('hide');
        this.pnotify.success({
          text: "Thêm Thành Công",
          delay:2000   
        });
        this.listData();
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

  public Edit()
  {
    const data = {
      dcname:  $('#courseName2').val(),
      dcdetail:  $('#description2').val(),
      id: self.rowId
    }
    const token = localStorage.getItem('token');
    this.course.EditCourse(data ,token).then((data)=>{
      if(data.json().errorCode == 0 && data.json().status === 'successfully')
      {
        $('#department').modal('hide');
        this.pnotify.success({
          text: "Sửa Thành Công",
          delay:2000   
        });
        this.listData();
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

  public ngOnInit() {
    self=this;

    $('.btn_add').click(function(){
      $('#course').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Khóa");
      }
    }) 

    $('#courseedit').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var Id2=$('#hideId2').val();
      if(Id2==0)
      {
        $('.modal-title').text("Thêm Khóa");
        $('#dept2').val("");
        $('#dept_name2').val("");
      }
      else
      {
        $('.modal-title').text("Sửa Khóa");
        $('#courseName2').val(self.infodata.dcname);
        $('#description2').val(self.infodata.dcdetail);
       
      }
    });

    tbl = $("#courseTable").DataTable({
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
      rowId: "dcid",
      columns: [
        { data: null},
        { data: "dcname" },  
        { data: "dcdetail" },            
        { data: null,  render: function ( data, type, row ) {
          return '<i data-group="grpEdit" class="fa fa-check text-warning m-1 pointer" ></i>'+
          '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
        }}
      ],
      initComplete: function (settings, json) {
        self.listData();
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

  public bindTableEvents()
  {
    $('#dataTable_wrapper').removeClass("container-fluid");
    $('i[data-group=grpEdit]').off('click').click(function(){
      const token = localStorage.getItem('token');
      self.rowId=$(this).closest('tr').attr('id');
      $('#hideId2').val(self.rowId);
      self.course.getCourseDataById(token, self.rowId).then(data=>{
        if(data.json().errorCode == 0 && data.json().status === 'successfully')
        {
          self.infodata = data.json().data;
          $('#courseedit').modal("show");
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
                self.course.DeleteCourse(self.rowId,token).then(data=>{
                    if(data.json().errorCode==0 && data.json().status === 'successfully')
                    {
                      self.pnotify.success({
                        text: "Xóa Thành Công",
                        delay:2000   
                      });
                      self.listData();
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
