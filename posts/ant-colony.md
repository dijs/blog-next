---
published: true
title: Rise of the Ants
blurb: A Godot 4 Sim of Tiny Chaos
layout: post
date: 4/22/2025
---

Ever wonder what happens when you unleash a bunch of hungry little pixels with the collective intelligence of a grain of sand and the speed of a toddler chasing candy? Welcome to **AntSim 2025**, my first foray into Godot 4, where I attempt to simulate ant behavior using not-so-advanced AI and an embarrassing amount of trial-and-error.

<iframe style="width: 100%; height: 500px;" src="/ant-colony/index.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

This project was half "learn Godot 4" and half "what if bugs... but code?" Let’s talk about how I built this chaotic critter engine.

## Ant Behavior

We’ve got basic scent-following, food grabbing, base-finding... the works. Think of it as a GPS powered by nose sweat. The actual pathfinding logic? Eh. Let’s just say if your Uber driver had the same instincts as my ants, you'd be in a river by now.

## The smell engine

In this simulation, ants don’t navigate using fancy pathfinding or waypoints—they rely entirely on scent, just like their real-world counterparts. When an ant finds food, it drops a "food scent" trail on the way back to the colony. Other ants sniff around (okay, follow the scent gradient) and decide where to go based on the strength of the trail. Likewise, ants heading out from the nest leave behind a "home scent" so they don’t get lost on their crumb-fueled adventures. These pheromone trails fade over time, meaning the system is always adapting. It's messy, organic, and exactly how I imagine traffic would work if humans used smell instead of street signs.

```gdscript
scent.strength *= pow(0.5, delta)
```

Exponential decay, these ants leave a trail like sweaty marathon runners, and it fades just as fast.

## The steering wheel

```gdscript
func steer():
	if not handle_target_in_sight():
		var total_vector = Vector2.ZERO
		var total_strength = 0.0

		for scent in get_detected_scents():
			var dir_to_scent = (scent.global_position - global_position).normalized()
			var alignment = move_dir.dot(dir_to_scent)

			total_vector += dir_to_scent * scent.get_strength() * alignment
			total_strength += scent.get_strength()

		if total_strength > 0:
			move_dir = total_vector.normalized()
			# Add some noise
			move_dir = move_dir.rotated(randf_range(-NOISE_ROTATION_MAX, NOISE_ROTATION_MAX)).normalized()
		else:
			# Wander randomly
			move_dir = move_dir.rotated(randf_range(-WANDER_ROTATION_MAX, WANDER_ROTATION_MAX)).normalized()

	velocity = move_dir * speed
```

Ants in this simulation don’t just blindly follow the strongest scent—they actually blend direction and strength to make smarter, more organic movement decisions. The `steer` function is where the magic happens. Each ant samples nearby scent sources, calculates the direction toward each one, and weights that direction by how strong the scent is and how well it aligns with the ant’s current movement. All those vectors are mashed together into a “consensus direction,” which the ant then follows—with a bit of noise added in for randomness, because nobody likes a perfectly optimized bug. If no scent is detected, the ant just wiggles around aimlessly in a wandering pattern, like it forgot what it was doing. It's a balance of signal-following and chaos, and it’s weirdly fun to watch.

## Watching Emergence Happen

Zooming out from individual ant logic, the real magic of this project isn’t in a single function—it’s in the emergent chaos of the whole simulation. The simulation is orchestrating births, deaths, and colony stats. It starts by spawning a small population near the nest, and from there, life unfolds. Every few seconds, if the colony has food reserves, a new ant is born. When resources dwindle, births slow down—and if the colony runs out entirely, the simulation quietly fizzles into extinction.

You’re not micromanaging individual ants—you’re watching a colony emerge, thrive, stumble, and maybe even collapse… all based on rules you wrote in a couple hundred lines of code.

And that's the joy of it. You’re not just building a game—you’re creating a tiny world, one scent trail and wobbling bug at a time. It’s goofy, it’s glitchy, and it might be the most unexpectedly poetic thing I’ve ever done with a game engine.
