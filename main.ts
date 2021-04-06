function ist_Wand (col: number, row: number) {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col * 2, row * 2), sprites.builtin.forestTiles0)) {
        return 1
    }
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col * 2, row * 2), sprites.builtin.coral0)) {
        return 1
    }
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(col * 2, row * 2), assets.tile`myTile2`)) {
        return 1
    }
    if (tiles.tileIsWall(tiles.getTileLocation(col * 2, row * 2))) {
        return 1
    }
    if (col < 0 || col >= tiles.tilemapColumns() / 2) {
        return 1
    }
    if (row < 0 || row >= tiles.tilemapRows() / 2) {
        return 1
    }
    return 0
}
function bewegeExplorer (x: number, y: number) {
    for (let Index = 0; Index <= 3; Index++) {
        animiere(Index, x, y)
        explorer.x += x / 4
        explorer.y += y / 4
        pause(60)
    }
    explorer.setImage(assets.image`Spieler steht`)
}
function ist_am_Ziel () {
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(expl_col * 2, expl_row * 2), sprites.castle.tileGrass1)) {
        return 1
    }
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(expl_col * 2, expl_row * 2), sprites.dungeon.collectibleBlueCrystal)) {
        return 1
    }
    if (tiles.tileAtLocationEquals(tiles.getTileLocation(expl_col * 2, expl_row * 2), sprites.dungeon.floorDarkDiamond)) {
        return 1
    }
    return 0
}
function nächstes_Level () {
    Blubberblasen = 0
    Schneeeffekt = 0
    level += 1
    if (level == 1) {
        tiles.setTilemap(tilemap`Level0`)
        setzeExplorer(0, 2)
        game.showLongText("Level 1-1", DialogLayout.Bottom)
    } else if (level == 2) {
        music.powerUp.play()
        game.splash("Here's your shield!", "+1 protection")
        tiles.setTilemap(tilemap`Level13`)
        setzeExplorer(0, 0)
        game.showLongText("Level 1-2", DialogLayout.Bottom)
    } else if (level == 3) {
        music.powerUp.play()
        game.splash("Here's your pocket knife!", "You thought it was bigger?")
        tiles.setTilemap(tilemap`Level14`)
        setzeExplorer(5, 5)
        game.showLongText("Level 1-3", DialogLayout.Bottom)
    } else if (level == 4) {
        music.powerUp.play()
        game.splash("Here's your toothbrush!", "Keep 'em clean.")
        tiles.setTilemap(tilemap`Level15`)
        setzeExplorer(4, 0)
        game.showLongText("Level 1-4", DialogLayout.Bottom)
    } else if (level == 5) {
        music.powerUp.play()
        game.splash("Here's your aqualung!", "Take the search underwater")
        tiles.setTilemap(tilemap`Level21`)
        setzeExplorer(8, 0)
        Blubberblasen = 1
        game.showLongText("Level 2-1", DialogLayout.Bottom)
    } else if (level == 6) {
        music.powerUp.play()
        game.splash("...")
        tiles.setTilemap(tilemap`Level22`)
        setzeExplorer(19, 0)
        Blubberblasen = 1
        game.showLongText("Level 2-2", DialogLayout.Bottom)
    } else if (level == 7) {
        music.powerUp.play()
        game.splash("...")
        tiles.setTilemap(tilemap`Level3`)
        setzeExplorer(0, 0)
        Blubberblasen = 1
        game.showLongText("Level 2-3", DialogLayout.Bottom)
    } else if (level == 8) {
        music.powerUp.play()
        game.splash("...")
        tiles.setTilemap(tilemap`Level16`)
        setzeExplorer(7, 7)
        Blubberblasen = 1
        game.showLongText("Level 2-4", DialogLayout.Bottom)
    } else if (false) {
        tiles.setTilemap(tilemap`Level31`)
    } else {
        music.powerUp.play()
        game.splash("Here're your underpants!", "Why did you take them off?")
        game.showLongText("You found all your stuff. Well done! ", DialogLayout.Top)
        game.showLongText("But look, it's gotten late. Mum wants you to go to bed. Well, ... try again tomorrow!", DialogLayout.Top)
        game.over(true)
    }
}
function setzeExplorer (col: number, row: number) {
    expl_col = col
    expl_row = row
    explorer.setPosition(expl_col * 32 + 16, expl_row * 32 + 16)
}
function laufe (col: number, row: number) {
    if (ist_Wand(expl_col + col, expl_row + row) == 0) {
        expl_col = expl_col + col
        expl_row = expl_row + row
        bewegeExplorer(col * 32, row * 32)
    }
}
function animiere (Frame: number, x: number, y: number) {
    if (Frame / 2 < 1) {
        explorer.setImage(assets.image`Spieler Schritt links`)
    } else {
        explorer.setImage(assets.image`Spieler Schritt rechts`)
    }
}
let expl_row = 0
let expl_col = 0
let explorer: Sprite = null
let Schneeeffekt = 0
let Blubberblasen = 0
let level = 0
level = 0
Blubberblasen = 0
Schneeeffekt = 0
game.showLongText("You wake up, eager for adventure. But where is all your equipment? Go find it!", DialogLayout.Top)
explorer = sprites.create(assets.image`Spieler steht`, SpriteKind.Player)
scene.cameraFollowSprite(explorer)
nächstes_Level()
forever(function () {
    if (ist_am_Ziel()) {
        nächstes_Level()
    }
    if (controller.A.isPressed() && controller.B.isPressed()) {
        nächstes_Level()
    }
    if (controller.up.isPressed()) {
        laufe(0, -1)
    }
    if (controller.down.isPressed()) {
        laufe(0, 1)
    }
    if (controller.left.isPressed()) {
        laufe(-1, 0)
    }
    if (controller.right.isPressed()) {
        laufe(1, 0)
    }
})
forever(function () {
    while (Blubberblasen) {
        effects.bubbles.startScreenEffect(500)
        pause(500)
    }
})
forever(function () {
    while (Schneeeffekt) {
        effects.blizzard.startScreenEffect(500)
        pause(500)
    }
})
