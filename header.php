<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php bloginfo('name'); ?></title>
	<meta charset="utf-8" />
	<meta name="description" content="Xavier Burrow is a web-developer and animator creating interactive spaces.">
  <meta name="keywords" content="Xavier Burrow, web design, interaction design, animation">
  <meta name="author" content="Xavier Burrow">
	<meta property="og:url" content="http://xavierburrow.com/" />
	<meta property="og:title" content="Xavier Burrow"/>
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/lib/img/background-white.jpg"/>
	<meta property="og:site_name" content="Xavier Burrow"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<!--<link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">-->
	<link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
	<?php wp_head(); ?>
	<script>
		/* <![CDATA[ */
		var themePath = '<?php echo get_template_directory_uri(); ?>';
		var pageTitle = '<?php echo get_the_title(); ?>';
		var isHome = '<?php echo is_home(); ?>';
		/* ]]> */
	</script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-60746754-6"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'UA-60746754-6');
	</script>
</head>
<body class="<?php echo join(' ', get_body_class(''));?>">
