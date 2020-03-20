<!DOCTYPE html>
<html lang="en">
<head>
	<title><?php bloginfo('name'); ?></title>
	<meta name='description' content='<?php echo get_bloginfo('description'); ?>'>
  <meta name='keywords' content=''>
  <meta name='author' content='http://xavierburrow.com'>
	<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'>
	<meta property='og:url' content='https://naomialpert.com'>
	<meta property='og:title' content='Naomi Alpert'>
	<meta property='og:image' content='<?php echo get_template_directory_uri(); ?>/images/og-image.jpg'>
	<meta property='og:site_name' content='Xavier Burrow'>
	<meta property='og:description' content='<?php echo get_bloginfo('description'); ?>'>
	<link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/img/favicon.png">
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
<body <?php body_class(); ?>>
