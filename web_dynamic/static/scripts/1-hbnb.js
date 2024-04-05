// Script that enhances 1-hbnb.html with dynamic filters using jQuery
'use script';
$(() => {
  let selectedAmenities = [];
  const selectors = {
    amenitiesHeader: '.amenities > h4',
    amenityCheckBox: '.amenities > .popover > ul > li > input[type="checkbox"]',
    amenityListItem: '.amenities > .popover > ul > li'
  };

  $(selectors.amenityListItem).on('mousedown', ev => {
    ev.target.getElementsByTagName('input')?.item(0)?.click();
  });

  $(selectors.amenityCheckBox).change(ev => {
    const amenityId = ev.target.getAttribute('data-id');
    const amenityName = ev.target.getAttribute('data-name');

    if (ev.target.checked) {
      if (!selectedAmenities.find(obj => obj.id === amenityId)) {
        selectedAmenities.push({
          id: amenityId,
          name: amenityName
        });
      }
    } else {
      selectedAmenities = selectedAmenities.filter(
        obj => (obj.id !== amenityId) && (obj.name !== amenityName)
      );
    }
    const htmlContent = selectedAmenities.map(obj => obj.name).join(', ');
    $(selectors.amenitiesHeader).html(
      selectedAmenities.length > 0 ? htmlContent : '&nbsp;'
    );
  });
});
