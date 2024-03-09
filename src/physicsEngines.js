class PhysicsEngine {
    constructor({ gravity }) {
        this._gravity = gravity
    }
    update(entity, falling) {
        if (entity.falling) {
            entity.speed += this._gravity * delta
            entity.y += entity.speed * delta
        }
    }
}