<?php
  $title = get_the_title();
  $date = get_field('date');
  $desc = get_field('description');
  $thumb = get_field('thumbnail');
  $images = get_field('images');
  $video = get_field('video');
  $links = get_field('links');
  $tech = get_field('tech');
  $id = get_the_ID();
  $cats = wp_get_post_categories($id);
  $order = get_post($id)->menu_order - 1;
  $classList = '';
  foreach($cats as $c){
    $cat = get_category($c);
    $classList .= ' filter-' . $cat->slug;
  }
?>

<div class='section hidden <?php echo $classList; ?>' data-index='<?php echo $order; ?>'>
  <div class='section__inner'>
    <div class='project-title'>
      <span class='project-title__text'><?php echo $order . '. ' . $title; ?></span>
    </div>
    <div class='image-card'>
      <div class='filter-icon'></div>
      <?php if ($thumb): ?>
        <img src='<?php echo $thumb['url']; ?>'/>
      <?php endif; ?>
    </div>
  </div>
  <div class='section-data' style='display: none;'>
    <div class='title'><?php echo $title; ?></div>
    <div class='description'><?php echo $desc; ?></div>
    <?php if ($date): ?>
      <div class='date'><?php echo $date; ?></div>
    <?php endif; ?>
    <?php if ($links): ?>
      <div class='links'>
        <div class='label'>Links:</div>
        <?php foreach($links as $link): ?>
          <a class='link' href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['label']; ?></a>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
    <?php if ($images): ?>
      <div class='image'>
        <div class='slider'>
          <div class='slides'>
            <?php foreach($images as $img): ?>
              <div class='slide'>
                <img src='<?php echo $img['url']; ?>'>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    <?php endif; ?>
    <?php if ($tech): ?>
      <div class='tech'>
        <div class='label'>Technologies:</div>
        <?php foreach($tech as $t): ?>
          <div class='item'><?php echo $t['item']; ?></div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
    <?php if ($video): ?>
      <div class='video' data-src='<?php echo $video; ?>'></div>
    <?php endif; ?>
  </div>
</div>
