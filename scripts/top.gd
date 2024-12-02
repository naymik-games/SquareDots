extends MarginContainer
@onready var counter_label = $NinePatchRect/HBoxContainer/counter_label
@onready var goal_container = $NinePatchRect/HBoxContainer/MarginContainer/HBoxContainer2
@export var goal_prefab: PackedScene
# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _on_game_manager_set_counter(amount):
	if !counter_label:
		counter_label = $NinePatchRect/HBoxContainer/counter_label
	counter_label.text = str(amount)



func make_goal(new_max, new_texture, new_value):
	if !goal_container:
		goal_container = $NinePatchRect/HBoxContainer/MarginContainer/HBoxContainer2
	var current = goal_prefab.instantiate()
	goal_container.add_child(current)
	current.set_goal_values(new_max, new_texture, new_value)


func _on_goal_holder_create_goal(new_max, new_texture, new_value):
	make_goal(new_max, new_texture, new_value)


func _on_grid_check_goal(goal_type):
	for i in goal_container.get_child_count():
		goal_container.get_child(i).update_goal_values(goal_type)


func _on_ice_holder_break_ice(goal_type):
	for i in goal_container.get_child_count():
		goal_container.get_child(i).update_goal_values(goal_type)


func _on_concreate_holder_break_concreate(goal_type):
	for i in goal_container.get_child_count():
		goal_container.get_child(i).update_goal_values(goal_type)
