extends Node
@export var health: int
@onready var sprite = $Sprite2D
@export var color: String
# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func take_damage(damage):
	health -= damage
	sprite.frame += 1