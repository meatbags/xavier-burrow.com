<?php
  $title = get_the_title();
  $desc = get_field('description');
  $thumb = get_field('thumbnail');
  $image = get_field('image');
  $video = get_field('video');
  $links = get_field('links');
  $id = get_the_ID();
  $cats = wp_get_post_categories($id);
  $classList = '';
  foreach($cats as $c){
    $cat = get_category($c);
    $classList .= ' filter-' . $cat->slug;
  }
?>
<div class='section <?php echo $classList; ?>'>
  <div class='section__inner'>
    <div class='image-card'>
      <?php if ($thumb): ?>
        <img src='<?php echo $thumb['url']; ?>'/>
      <?php endif; ?>
    </div>
    <div class='section-data'>
      <div class='title'><?php echo $title; ?></div>
      <div class='image'><?php echo $image['url']; ?></div>
      <div class='description'><?php echo $desc; ?></div>
      <div class='video'><?php echo $video; ?></div>
      <div class='links'>
        <?php if ($links): ?>
          <?php foreach($links as $link): ?>
            <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
