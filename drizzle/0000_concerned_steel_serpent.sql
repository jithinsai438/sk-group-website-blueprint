CREATE TABLE `project_enquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`division` text NOT NULL,
	`message` text NOT NULL,
	`project_id` integer,
	`created_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`division` text NOT NULL,
	`description` text NOT NULL,
	`status` text NOT NULL,
	`location` text NOT NULL,
	`duration` text NOT NULL,
	`image` text,
	`tags` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
