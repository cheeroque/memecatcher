CREATE TABLE `emotions` (
	`id` integer PRIMARY KEY NOT NULL,
	`emoji` text NOT NULL,
	`alias` text DEFAULT '',
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stickers` (
	`id` integer PRIMARY KEY NOT NULL,
	`image` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stickers_emotions` (
	`sticker_id` integer NOT NULL,
	`emotion_id` integer NOT NULL,
	FOREIGN KEY (`sticker_id`) REFERENCES `stickers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`emotion_id`) REFERENCES `emotions`(`id`) ON UPDATE no action ON DELETE cascade
);
