extends Node

var ice_pieces = []
#var width = 10
#var height = 10
var ice = preload("res://scenes/ice.tscn")
var ice_string = "ice"
signal break_ice
signal check_goal
# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

func make_2d_array(width, height):
	var array =[]
	for i in width:
		array.append([])
		for j in height:
			array[i].append(null)
	return array

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _on_grid_make_ice(board_position,x_start, offset,y_start,width, height):
	if ice_pieces.size() == 0:
		ice_pieces = make_2d_array(width, height)
	var current = ice.instantiate()
	add_child(current)
	current.position = Vector2(board_position.x*offset+x_start, -board_position.y*offset+y_start)
	ice_pieces[board_position.x][board_position.y] = current


func _on_grid_damage_ice(board_position):
	if ice_pieces.size() !=0:
		if ice_pieces[board_position.x][board_position.y] != null:
			ice_pieces[board_position.x][board_position.y].take_damage(1)
			if ice_pieces[board_position.x][board_position.y].health <= 0:
				ice_pieces[board_position.x][board_position.y].queue_free()
				ice_pieces[board_position.x][board_position.y] = null
				emit_signal("break_ice",ice_string)
