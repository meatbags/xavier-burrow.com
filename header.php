<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php bloginfo('name'); ?></title>
	<meta name="description" content="<?php bloginfo(); ?>">
	<meta charset="utf-8" />
	<meta property="og:url" content="" />
	<meta property="og:title" content="Xavier Burrow"/>
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/screenshot.jpg"/>
	<meta property="og:site_name" content="Xavier Burrow"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<!--
	<link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
	-->
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
	<?php wp_head(); ?>
	<script>
		/* <![CDATA[ */
		var themePath = '<?php echo get_template_directory_uri(); ?>';
		var pageTitle = '<?php echo get_the_title(); ?>';
		var isHome = '<?php echo is_home(); ?>';
		/* ]]> */
	</script>
</head>
<body class="<?php echo join(' ', get_body_class(''));?>">
<div class="content">
	<div class="wrapper">
