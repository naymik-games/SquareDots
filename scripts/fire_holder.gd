extends Node


signal remove_fire

var fire_pieces = []
#var width = 10
#var height = 10
var fire = preload("res://scenes/fire.tscn")

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


func _on_grid_make_fire(board_position,x_start, offset,y_start,width, height):
	if fire_pieces.size() == 0:
		fire_pieces = make_2d_array(width, height)
	var current = fire.instantiate()
	add_child(current)
	current.position = Vector2(board_position.x*offset+x_start, -board_position.y*offset+y_start)
	fire_pieces[board_position.x][board_position.y] = current


func _on_grid_damage_fire(board_position):
	if fire_pieces.size() !=0:
		if fire_pieces[board_position.x][board_position.y] != null:
			fire_pieces[board_position.x][board_position.y].take_damage(1)
			if fire_pieces[board_position.x][board_position.y].health <= 0:
				fire_pieces[board_position.x][board_position.y].queue_free()
				fire_pieces[board_position.x][board_position.y] = null
				emit_signal("remove_fire", board_position)
