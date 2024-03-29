window.addEventListener("load", function(event) {
  var vue_app = new Vue({
  el: '#app',
  data: {
    page:0,
    svg_draw: null,
    svg_bg_image: null,
    mark_categories: [
                        {id: 0, name:"请选择"},
                        {id: 1, name: "Apple"}, 
                        {id: 2, name: "Grape"}, 
                        {id: 3, name: "Watermelon"}, 
                        {id: 4, name: "Blueberry "}, 
                        {id: 5, name: "Banana"}, 
                        {id: 6, name: "Peach"}, 
                        {id: 7, name: "Melon"},
                        {id: 8, name: "Strawberry"}
                      ],
    images:[
//marks:{name: category_name, svg_element: box_group, selected: false, points: points_4, category_id: category_id }
              {thumb_url:'/{[ img_id0 ]}', url:'/{[ img_id0 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id1 ]}', url:'/{[ img_id1 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id2 ]}', url:'/{[ img_id2 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id3 ]}', url:'/{[ img_id3 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id4 ]}', url:'/{[ img_id4 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id5 ]}', url:'/{[ img_id5 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id6 ]}', url:'/{[ img_id6 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id7 ]}', url:'/{[ img_id7 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id8 ]}', url:'/{[ img_id8 ]}', marks: [ ]},
              {thumb_url:'/{[ img_id9 ]}', url:'/{[ img_id9 ]}', marks: [ ]}
    ],

    current_image: null,

  },

  mounted: function () {

    let _this = this;
    var drag_start = false;
    var drag_draw_element = null;
    var drag_start_point = {x:-1, y:-1};
    var drag_end_point = {x:-1, y:-1};
    var drag_new_rect = false;
    var mouse_draged = false;

    this.svg_draw = SVG().addTo('#drawing').size(900, 500);
    this.svg_bg_image = this.svg_draw.image(_this.images[0].url);

    this.svg_draw.mousedown(function(e) {
      var point = {x: e.offsetX, y: e.offsetY};
      console.log("mousedown: point", point);
      drag_start = true;
      mouse_draged = false;
      drag_start_point = point;
    });

    this.svg_draw.mousemove(function(e) {
      console.log("mousemove");
      var current_point = {x: e.offsetX, y: e.offsetY};
      
      if(drag_start) {
        var points_5 = [[drag_start_point.x,drag_start_point.y], [current_point.x,drag_start_point.y], [current_point.x,current_point.y], [drag_start_point.x, current_point.y], [drag_start_point.x,drag_start_point.y]];
        if(drag_draw_element != null) {
          drag_draw_element.remove();
        }
        drag_draw_element = _this.svg_draw.polyline(points_5).fill('none').stroke({ width: 2, color: '#000'});


      } else {
          /*
          vue_app.mark_elements.forEach(item =>{
              var rect_box = item.svg_element.get(0);
          });
          */
      }
    });

    this.svg_draw.mouseup(function(e) {
      var point = {x: e.offsetX, y: e.offsetY};
      var element_id = _this.current_image.marks.length;
      console.log("mouseup: point", point);

      var drag_distance_x = point.x - drag_start_point.x;
      var drag_distance_y = point.y - drag_start_point.y;
      if(drag_distance_x < 0) {
        drag_distance_x = -drag_distance_x;  
      }
      if(drag_distance_y < 0) {
        drag_distance_y = -drag_distance_y;  
      }
      var drag_offset_min = 7;
      if(drag_start && (drag_distance_x > drag_offset_min || drag_distance_y > drag_offset_min)) {
        mouse_draged = true;  
      } else {
        mouse_draged = false;
      }
      if(!mouse_draged) {
        drag_start = false;
        if(drag_draw_element != null) {
          drag_draw_element.remove();
          drag_draw_element = null;
        }
        return;
      }
      drag_start = false;


      // 鼠标松开，生成标签
      var category_name = _this.mark_categories[0].name;
      var category_id = _this.mark_categories[0].id;
      var points_4 = [[drag_start_point.x,drag_start_point.y], [point.x,drag_start_point.y], [point.x,point.y], [drag_start_point.x, point.y]];
      var text = _this.svg_draw.text(category_name).attr({x:drag_start_point.x, y:drag_start_point.y-24 });

      var box_group = _this.svg_draw.group();
      box_group.add(drag_draw_element);
      box_group.add(text);

      _this.current_image.marks.push({name: category_name, svg_element: box_group, selected: false, points: points_4, category_id: category_id });
      drag_draw_element = null;

    });

    // 默认显示第一张图片
    if(this.current_image == null) {
      this.selectImage(this.images[0]);
    }
    // function load(name) {
    //     let xhr = new XMLHttpRequest(),
    //         okStatus = document.location.protocol === "file:" ? 0 : 200;
    //             xhr.open('GET', name, false);
    //             xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
    //             xhr.send(null);
    //             return xhr.status === okStatus ? xhr.responseText : null;
    //         }
    //
    //         let text = load("static/text/0.txt");
    //         console.log(text);

      // for( var i =0 ;i<obj.length;i++){
      //
      // }


            // var arr = [[0,6,[[221, 92], [390, 92], [390, 200], [221, 200],[221, 92]]],
            //            [1,3,[[321, 292], [390, 292], [390, 300], [321, 300],[321, 292]]]];


    // 用arr接收mark列表 循环展示到图片上
    for (arra of {[ arr ]})
    {
        console.log(arra);
        _this.make_mark(arra);
    }

        _this.selectImage(_this.images[1]);
      _this.selectImage(_this.images[0])
            },


  methods: {

        // 定义生成标签函数
     make_mark: function([img_id,id, point]) {
        let _this = this;

        var category_name = _this.mark_categories[id].name;
        var category_id = _this.mark_categories[id].id;
        drag_draw_element = _this.svg_draw.polyline(point).fill('none').stroke({ width: 2, color: '#000'});
        var text = _this.svg_draw.text(category_name).attr({x:point[0][0], y:point[0][1]-24 });
        var box_group = _this.svg_draw.group();

        box_group.add(drag_draw_element);
        box_group.add(text);

            //  drag_draw_element.category_id = id;
       //  drag_draw_element.name = _this.mark_categories[id].name;
       //  drag_draw_element.svg_element.get(1).text(c_object.name);

        _this.images[img_id].marks.push({name:category_name, svg_element: box_group, selected: false, points:point,category_id: category_id });


        },

        // 选择标签
      toggleMark: function(selectedMark){
      var element_rect = selectedMark.svg_element.get(0);
      if(selectedMark.selected) {
        selectedMark.selected = false;
        element_rect.stroke({ width: 2, color: '#000'});
      } else {
        this.current_image.marks.forEach(item =>{
          if(item != selectedMark) {
            item.selected = false;
            item.svg_element.get(0).stroke({ width: 2, color: '#000'});
          } else {
            selectedMark.selected = false;
            element_rect.stroke({ width: 2, color: '#FF9900'});
          }
        });
      }
    },


    // 移除标签
    removeMark: function(image, mark, index,) {
      console.log(mark.points);

      // Ajax DELETE 提交
      axios({
        url:"/work",
        method:'delete',
        data:{
          img_id:image.url,
          category_id:mark.img_id,
          point:mark.points,
        },
      });

      mark.svg_element.remove();
      this.$delete(this.current_image.marks, index);

    },

    // 选择标签
    selectMarkCategory: function(image, mark, event){
        // console.log("selectMarkCategory===="+"value等于==="+event.target.value+"name等于==="+mark.name+"thumb_url等于==="+image.thumb_url);
        var c_id = event.target.value;
        var c_object = this.mark_categories.find(function(category){
           return category.id == c_id;
        });

        mark.category_id = c_id;
        mark.name = c_object.name;
        mark.svg_element.get(1).text(c_object.name);

        // Ajax POST提交
        axios({
        url:"/work",
        method:'post',
        data:{
          img_id:image.url,
          category_id:mark.category_id,
          point:mark.points,
        },
      });
    },

    // 选择缩略图
    selectImage: function(image_object) {
      console.log("Loading ", image_object.url);
      if(this.current_image == null || this.current_image.url != image_object.url) {

        // Remove old svg marks first.
        if(this.current_image != null) {
          this.current_image.marks.forEach(item =>{
            item.svg_element.remove();
          });
        }

        if(image_object.marks.length > 0) {
          image_object.marks.forEach(item =>{
            item.svg_element.addTo(this.svg_draw);
          });
        }
        
        this.current_image = image_object;
        this.svg_bg_image.load(image_object.url);
        this.svg_bg_image.size(900, 500);
      } else {
        console.log("Same image, not load again.");
      }
    } // selectImage

  },

  }); // new Vue
});
