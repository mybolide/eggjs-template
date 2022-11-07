ALTER TABLE user_garden ADD change_name INT DEFAULT 0 COMMENT '是否改变菜园名称0 未改变，1已修改';
ALTER TABLE user_garden ADD land_no VARCHAR(255) COMMENT '编号' ;