<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php bloginfo('name'); ?></title>
	<meta charset="utf-8" />
	<meta name="description" content="">
  <meta name="keywords" content="Xavier Burrow">
  <meta name="author" content="Xavier Burrow">
	<meta property="og:url" content="" />
	<meta property="og:title" content="Xavier Burrow"/>
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/screenshot.jpg"/>
	<meta property="og:site_name" content="Xavier Burrow"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<!--
	<style type='text/css'>
		@font-face {
			font-family: "Birch";
			src: url("<?php echo get_template_directory_uri(); ?>/font/BirchStd.otf");
		}
	</style>
	-->
	<link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
	<!--<link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">-->
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
