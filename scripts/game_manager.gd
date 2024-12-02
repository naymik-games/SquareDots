extends Node
#gameplay

enum {play, win, lose, pause}

var state = play

var play_board = true

@export var width:int
@export var height: int
#level
@export var level:int
@export var is_moves:bool
@export var max_counter:int
var current_counter
@export var num_colors: int

#score
var current_high_score
var current_score = 0
@export var max_score: int
@export var points_per_piece: int
@onready var game_over_screen = $game_over_panel
@onready var game_win_screen = $game_win_panel
@onready var goal_container = $"../goal_holder"

var goal_data = [
	{ "max_count": 10, "type": "red", "texture": "res://assets/Red.png" },
	{ "max_count": 10, "type": "blue", "texture": "res://assets/Blue.png" },
]


#signals
signal set_dimensions
signal set_counter
signal change_game_state

# Called when the node enters the scene tree for the first time.
func _ready():
	if !is_moves:
		$move_timer.start()
	emit_signal("set_dimensions", width, height, num_colors)
	current_counter = max_counter
	emit_signal("set_counter", current_counter)
	game_over_screen.hide()
	game_win_screen.hide()
	

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _on_grid_update_counter():
	if is_moves:
		current_counter -= 1
		if current_counter < 0:
			current_counter = 0
		emit_signal("set_counter", current_counter)
		if current_counter == 0:
			print("GAME OVER")
			play_board = false
			emit_signal("change_game_state", play_board)
			game_over_screen.show()

func _on_move_timer_timeout():
	if !is_moves:
		current_counter -= 1
		if current_counter < 0:
			current_counter = 0
		emit_signal("set_counter", current_counter)
		if current_counter == 0:
			$move_timer.stop()
			print("GAME OVER")
			play_board = false
			emit_signal("change_game_state", play_board)
			game_over_screen.show()


func _on_goal_holder_game_win():
	print("GAME WIN")
	play_board = false
	emit_signal("change_game_state", play_board)
	game_win_screen.show()
