def bewegeExplorer(x: number, y: number):
    for Index in range(4):
        animiere(Index, x, y)
        explorer.x += x / 4
        explorer.y += y / 4
        pause(50)
    explorer.set_image(img("""
        . . . . f f f f . . . . . 
                . . f f f f f f f f . . . 
                . f f f f f f c f f f . . 
                f f f f f f c c f f f c . 
                f f f c f f f f f f f c . 
                c c c f f f e e f f c c . 
                f f f f f e e f f c c f . 
                f f f b f e e f b f f f . 
                . f 4 1 f 4 4 f 1 4 f . . 
                . f e 4 4 4 4 4 4 e f . . 
                . f f f e e e e f f f . . 
                f e f b 7 7 7 7 b f e f . 
                e 4 f 7 7 7 7 7 7 f 4 e . 
                e e f 6 6 6 6 6 6 f e e . 
                . . . f f f f f f . . . . 
                . . . f f . . f f . . . .
    """))
def setzeExplorer(col: number, row: number):
    global expl_col, expl_row
    expl_col = col
    expl_row = row
    explorer.set_position(expl_col * 32 + 16, expl_row * 32 + 16)
def laufe(col: number, row: number):
    global expl_col, expl_row
    if not (tiles.tile_at_location_equals(tiles.get_tile_location((expl_col + col) * 2, (expl_row + row) * 2),
        sprites.builtin.forest_tiles0)):
        if expl_col + col >= 0 and expl_col + col < tiles.tilemap_columns() / 2:
            if expl_row + row >= 0 and expl_row + row < tiles.tilemap_rows() / 2:
                expl_col = expl_col + col
                expl_row = expl_row + row
                bewegeExplorer(col * 32, row * 32)
def animiere(Frame: number, x: number, y: number):
    if Frame / 2 == 0:
        explorer.set_image(img("""
            . . . . . . . . . . . . .
            . . . . . f f f f . . . .
            . . . f f f f f f f f . .
            . . f f f f f f c f f f .
            f f f f f f f c c f f f c
            f f f f c f f f f f f f c
            . c c c f f f e e f f c c
            . f f f f f e e f f c c f
            . f f f b f e e f b f f f
            . f f 4 1 f 4 4 f 1 4 f f
            . . f e 4 4 4 4 4 e e f e
            . f e f b 7 7 7 e 4 4 4 e
            . e 4 f 7 7 7 7 e 4 4 e .
            . . . f 6 6 6 6 6 e e . .
            . . . f f f f f f f . . .
            . . . f f f . . . . . . .
        """))
    else:
        explorer.set_image(img("""
            . . . . . . . . . . . . . 
                        . . . . f f f f . . . . . 
                        . . f f f f f f f f . . . 
                        . f f f c f f f f f f . . 
                        c f f f c c f f f f f f f 
                        c f f f f f f f c f f f f 
                        c c f f e e f f f c c c . 
                        f c c f f e e f f f f f . 
                        f f f b f e e f b f f f . 
                        f f 4 1 f 4 4 f 1 4 f f . 
                        e f e e 4 4 4 4 4 e f . . 
                        e 4 4 4 e 7 7 7 b f e f . 
                        . e 4 4 e 7 7 7 7 f 4 e . 
                        . . e e 6 6 6 6 6 f . . . 
                        . . . f f f f f f f . . . 
                        . . . . . . . f f f . . .
        """))
def nächstes_Level():
    global level
    level += 1
    if level == 1:
        game.show_long_text("Level 1", DialogLayout.BOTTOM)
        tiles.set_tilemap(tilemap("""
            Level8
        """))
        setzeExplorer(0, 2)
    elif level == 2:
        music.power_up.play()
        game.show_long_text("Level 2", DialogLayout.BOTTOM)
        tiles.set_tilemap(tilemap("""
            Level6
        """))
        setzeExplorer(0, 0)
    elif level == 3:
        music.power_up.play()
        game.show_long_text("Level 3", DialogLayout.BOTTOM)
        tiles.set_tilemap(tilemap("""
            Level1
        """))
        setzeExplorer(5, 5)
    elif level == 4:
        music.power_up.play()
        game.show_long_text("Level 4", DialogLayout.BOTTOM)
        tiles.set_tilemap(tilemap("""
            Level7
        """))
        setzeExplorer(4, 0)
    elif level == 5:
        music.power_up.play()
        game.show_long_text("Level 4", DialogLayout.BOTTOM)
        tiles.set_tilemap(tilemap("""
            Level9
        """))
        setzeExplorer(0, 0)
    else:
        game.over(True)
expl_row = 0
expl_col = 0
level = 0
explorer: Sprite = None
explorer = sprites.create(img("""
        . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f f f c c f f f c . 
            f f f c f f f f f f f c . 
            c c c f f f e e f f c c . 
            f f f f f e e f f c c f . 
            f f f b f e e f b f f f . 
            . f 4 1 f 4 4 f 1 4 f . . 
            . f e 4 4 4 4 4 4 e f . . 
            . f f f e e e e f f f . . 
            f e f b 7 7 7 7 b f e f . 
            e 4 f 7 7 7 7 7 7 f 4 e . 
            e e f 6 6 6 6 6 6 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . .
    """),
    SpriteKind.player)
scene.camera_follow_sprite(explorer)
level = 0
nächstes_Level()

def on_forever():
    if tiles.tile_at_location_equals(tiles.get_tile_location(expl_col * 2, expl_row * 2),
        sprites.castle.tile_grass1):
        nächstes_Level()
    if controller.up.is_pressed():
        laufe(0, -1)
    if controller.down.is_pressed():
        laufe(0, 1)
    if controller.left.is_pressed():
        laufe(-1, 0)
    if controller.right.is_pressed():
        laufe(1, 0)
forever(on_forever)
