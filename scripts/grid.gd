extends Node2D

enum {wait, move, win}
var state
var playable = true
#grid varialbles
var width:int
var height: int
@export var x_start: int
@export var y_start: int
@export var offset: int
@export var y_offset: int

var num_colors:int

var piece_bank = [
	preload("res://scenes/red.tscn"),
	preload("res://scenes/green.tscn"),
	preload("res://scenes/blue.tscn"),
	preload("res://scenes/brown.tscn"),
	preload("res://scenes/orange.tscn"),
	preload("res://scenes/purple.tscn")
	
]

var possible_pieces = []

#current pieces in scene
var all_pieces = []
var current_matches =[]
var current_color = null
var square_completed = false

signal update_counter
signal check_goal

# Obstacle Stuff
@export var sinker_piece: PackedScene
@export var sinkers_in_scene: bool
@export var max_sinkers: int
var current_sinkers = 0


@export var empty_spaces: PackedVector2Array
@export var ice_spaces: PackedVector2Array
@export var concrete_spaces: PackedVector2Array
@export var fire_spaces: PackedVector2Array

var damaged_fire = false

signal make_ice
signal damage_ice
signal make_concrete
signal damage_concrete
signal make_fire
signal damage_fire

#touch pieces
var first_touch = Vector2(0,0)
var last_touch = Vector2(0,0)
var final_touch = Vector2(0,0)
var controlling = false

#line stuff
signal add_point
signal clear_line
signal remove_last_point



# Called when the node enters the scene tree for the first time.
func _ready():
	x_start = ((704 -(width *64))/2)+32
	state = move
	set_pieces()
	all_pieces = make_2d_array()
	if sinkers_in_scene:
		spawn_sinkers(max_sinkers)
	spawn_pieces()
	spawn_ice()
	spawn_concrete()
	spawn_fire()

func set_pieces():
	print(piece_bank)
	for i in num_colors:
		possible_pieces.append(piece_bank[i])
	print(possible_pieces)

func make_2d_array():
	var array =[]
	for i in width:
		array.append([])
		for j in height:
			array[i].append(null)
	return array

func is_in_array(array, item):
	for i in array.size():
		if array[i] == item:
			return true
	return false

func remove_from_array(new_array, place):
	for i in range(new_array.size()-1, -1, -1):
		if new_array[i] == place:
			new_array.remove_at(i)
	return new_array

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if state == move and playable:
		touch_input()

func spawn_pieces():
	for i in width:
		for j in height:
			if !restricted_fill(Vector2(i,j)) and all_pieces[i][j] == null:
				var rand = floor(randi_range(0, possible_pieces.size()-1))
				var piece = possible_pieces[rand].instantiate()
				
				add_child(piece)
				piece.set_position(grid_to_pixel(i, j));
				all_pieces[i][j] = piece

func spawn_ice():
	for i in ice_spaces.size():
		emit_signal("make_ice", ice_spaces[i],x_start,offset,y_start, width, height)

func spawn_concrete():
	for i in concrete_spaces.size():
		emit_signal("make_concrete", concrete_spaces[i],x_start,offset,y_start, width, height)

func spawn_fire():
	for i in fire_spaces.size():
		emit_signal("make_fire", fire_spaces[i],x_start,offset,y_start, width, height)

func spawn_sinkers(number_to_spawn):
	for i in number_to_spawn:
		var column = floor(randi_range(0, width-1))
		while all_pieces[column][height - 1] != null or restricted_fill(Vector2(column, height - 1)):
			column = floor(randi_range(0, width-1))
		var current = sinker_piece.instantiate()
		add_child(current)
		current.position = grid_to_pixel(column, height - 1)
		all_pieces[column][height - 1] = current
		current_sinkers += 1

func grid_to_pixel(column, row):
	var new_x = x_start + offset * column
	var new_y = y_start + -offset * row
	return Vector2(new_x, new_y)

func pixel_to_grid(pixel_x, pixel_y):
	var new_x = round((pixel_x - x_start) / offset)
	var new_y = round((pixel_y - y_start) / -offset)
	return Vector2(new_x, new_y)

func restricted_fill(place):
	#check empty
	if is_in_array(empty_spaces, place):
		return true
	if is_in_array(concrete_spaces, place):
		return true
	#if is_in_array(concrete_spaces, place):
		#return true
	if is_in_array(fire_spaces, place):
		return true
	return false

func is_null(grid_position):
	if all_pieces[grid_position.x][grid_position.y] == null:
		return true
	return false

func is_in_grid(grid_position):
	if grid_position.x >= 0 && grid_position.x < width:
		if grid_position.y >= 0 && grid_position.y < height:
			return true
	return false

func touch_input():
	
	var mouse = get_global_mouse_position()
	mouse = pixel_to_grid(mouse.x, mouse.y)

	if Input.is_action_just_pressed("ui_touch"):
		if is_in_grid(mouse) and !is_null(mouse) and !controlling:
			first_touch = mouse
			
			#print(first_touch)
			#print(all_pieces[first_touch.x][first_touch.y].color)
			if !is_in_array(current_matches,mouse) and !is_piece_sinker(mouse.x,mouse.y) and !restricted_move(mouse):
				current_matches.append(mouse)
				all_pieces[mouse.x][mouse.y].dim()
				current_color = all_pieces[mouse.x][mouse.y].color
				controlling = true
				emit_signal("add_point",grid_to_pixel(mouse.x,mouse.y))
	if controlling:
		if is_in_grid(mouse) and !is_null(mouse):
			if valid_drag(get_last_match(), mouse) and !restricted_move(mouse) and !square_completed:
				last_touch = mouse
				current_matches.append(mouse)
				all_pieces[mouse.x][mouse.y].dim()
				emit_signal("add_point",grid_to_pixel(mouse.x,mouse.y))
			elif is_second_to_last(mouse) and current_matches.size() >1 and !square_completed:
				print("backtrack")
				remove_last_match()
				emit_signal("remove_last_point")
			elif is_adjecent(get_last_match(),mouse) and is_match(mouse) and complete_square(mouse):
				square_completed = true
				print("Square!")
				set_square()
				emit_signal("add_point",grid_to_pixel(mouse.x,mouse.y))
	if Input.is_action_just_released("ui_touch"):
		if controlling:
			emit_signal("clear_line")
			controlling = false
			if current_matches.size() > 1:
				get_parent().get_node("destroy_timer").start()
				state = wait
			else:
				
				square_completed = false
				current_matches.clear()
				for i in width:
					for j in height:
						if all_pieces[i][j] != null:
							all_pieces[i][j].undim()

func set_square():
	for i in width:
		for j in height:
			if all_pieces[i][j] != null:
				if all_pieces[i][j].color == current_color:
					var spot = Vector2(i,j)
					if !is_in_array(current_matches, spot):
						current_matches.append(spot)
						all_pieces[spot.x][spot.y].dim()

func restricted_move(place):
	#if is_in_array(lock_spaces, place):
		#return true
	return false		

func is_piece_sinker(column, row):
	if all_pieces[column][row] != null:
		if all_pieces[column][row].color == "sinker":
			return true
	return false

func get_last_match():
	return current_matches[-1]
func remove_last_match():
	current_matches.pop_back()
	all_pieces[last_touch.x][last_touch.y].undim()

func valid_drag(last,current):
	if is_adjecent(last,current) and !is_in_array(current_matches,current) and is_match(current):
		return true
	return false
func is_match(current):
	if all_pieces[current.x][current.y].color == current_color:
		return true
	return false
func is_adjecent(p1, p2):
	return (abs(p1.x - p2.x) == 1 && p1.y - p2.y == 0) || (abs(p1.y - p2.y) == 1 && p1.x - p2.x == 0);
	# allow diagonal
	#return (abs(p1.x - p2.x) <= 1) && (abs(p1.y - p2.y) <= 1)

func complete_square(current):
	if is_in_array(current_matches,current):
		var temp_matches = current_matches.duplicate()
		temp_matches.append(current)
		var index = temp_matches.find(current)
		var circle = temp_matches.slice(index,temp_matches.size())
		if circle.size() >= 5:
			return true
	return false




func is_second_to_last(piece):
	var secondToLastDot = getSecondToLastElement(current_matches);
	if secondToLastDot == piece:
		return true
	return false

func getLastElement(array):
	return getLaterElements(array, 1);

func getSecondToLastElement(array):
	return getLaterElements(array, 2);

func getLaterElements(array, index):
	return array[array.size() - index];

#############################
func destroy_matched():
	print("destroy")
	print(current_matches)
	square_completed = false
	for i in current_matches.size():
		var match = current_matches[i]
		if !is_null(match):
				emit_signal("check_goal", all_pieces[match.x][match.y].color)
				damage_special(match.x,match.y)
				all_pieces[match.x][match.y].queue_free()
				all_pieces[match.x][match.y] = null
	var temp_score = current_matches.size()
	#emit_signal("update_score", temp_score)
	current_matches.clear()
	get_parent().get_node("collapse_timer").start()

func damage_special(column, row):
	emit_signal("damage_ice", Vector2(column, row))
	#emit_signal("damage_lock", Vector2(column, row))
	check_concrete(column,row)
	#check_lock(column,row)
	check_fire(column,row)

func check_concrete(column,row):
	#right
	if column < width - 1:
		emit_signal("damage_concrete", Vector2(column+1,row))
	#left
	if column > 0:
		emit_signal("damage_concrete", Vector2(column-1,row))
	#up
	if row > 0:
		emit_signal("damage_concrete", Vector2(column,row-1))
	#down
	if row < height-1:
		emit_signal("damage_concrete", Vector2(column,row+1))

func check_fire(column,row):
	#right
	if column < width - 1:
		emit_signal("damage_fire", Vector2(column+1,row))
	#left
	if column > 0:
		emit_signal("damage_fire", Vector2(column-1,row))
	#up
	if row > 0:
		emit_signal("damage_fire", Vector2(column,row-1))
	#down
	if row < height-1:
		emit_signal("damage_fire", Vector2(column,row+1))

func collapse_collumns():
	for i in width:
		for j in height:
			if is_null(Vector2(i,j)) && !restricted_fill(Vector2(i,j)):
				for k in range(j+1, height):
					if !is_null(Vector2(i,k)):
						all_pieces[i][k].move(grid_to_pixel(i,j))
						all_pieces[i][j] = all_pieces[i][k]
						all_pieces[i][k] = null
						break
	destroy_sinkers()
	get_parent().get_node("refill_timer").start()

func refill_columns():
	if current_sinkers < max_sinkers:
		spawn_sinkers(max_sinkers-current_sinkers)
	for i in width:
		for j in height:
			if is_null(Vector2(i,j)) && !restricted_fill(Vector2(i,j)):
				var rand = floor(randi_range(0, possible_pieces.size()-1))
				var piece = possible_pieces[rand].instantiate()
				var loops = 0
				add_child(piece)
				piece.set_position(grid_to_pixel(i, j - y_offset));
				piece.move(grid_to_pixel(i,j))
				all_pieces[i][j] = piece
	if !damaged_fire:
		generate_fire()
	
	damaged_fire = false
	destroy_sinkers()
				#state = move
	emit_signal("update_counter")
	state = move


func generate_fire():
	if fire_spaces.size() > 0:
		var slime_made = false
		var tracker = 0
		while !slime_made && tracker < 100:
			# Check a random slime
			var random_num = floor(randi_range(0,fire_spaces.size()-1))
			var curr_x = fire_spaces[random_num].x
			var curr_y = fire_spaces[random_num].y
			var neighbor = find_normal_neighbor(curr_x,curr_y)
			if neighbor != null:
				all_pieces[neighbor.x][neighbor.y].queue_free()
				all_pieces[neighbor.x][neighbor.y]= null
				#slime_spaces.add(Vector2(curr_x,curr_y))
				fire_spaces.append(neighbor)
				emit_signal("make_fire", neighbor,x_start, offset,y_start,width, height)
				slime_made = true
			tracker += 1

func find_normal_neighbor(column, row):
	var directions = [
		Vector2(1, 0),  # Right
		Vector2(-1, 0), # Left
		Vector2(0, 1),  # Up
		Vector2(0, -1)  # Down
	]
	# Mieszanie kierunków
	directions.shuffle()

	# Sprawdź każdy kierunek
	for direction in directions:
		var neighbor_pos = Vector2(column, row) + direction
		if is_in_grid(neighbor_pos) and all_pieces[neighbor_pos.x][neighbor_pos.y] != null and !is_piece_sinker(neighbor_pos.x,neighbor_pos.y):
			return neighbor_pos
	return null

func destroy_sinkers():
	for i in width:
		if all_pieces[i][0] != null:
			if is_piece_sinker(i,0):
				current_matches.append(Vector2(i,0))
				current_sinkers -= 1
				emit_signal("check_goal", "sinker")
				
	if current_matches.size()>0:
		destroy_matched()

#############################

func _on_game_manager_set_dimensions(new_width, new_height,colors):
	width = new_width
	height = new_height
	num_colors = colors

func _on_destroy_timer_timeout():
	destroy_matched()


func _on_collapse_timer_timeout():
	collapse_collumns()


func _on_refill_timer_timeout():
	refill_columns()


func _on_concreate_holder_remove_concrete(place):
	concrete_spaces = remove_from_array(concrete_spaces, place)


func _on_fire_holder_remove_fire(place):
	damaged_fire = true
	fire_spaces = remove_from_array(fire_spaces, place)


func _on_game_manager_change_game_state(new_state):
	if !new_state:
		state = wait
		playable = false
	else:
		state = move
	pass # Replace with function body.
