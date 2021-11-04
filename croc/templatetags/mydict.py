from django import template
import ast

register = template.Library()


@register.simple_tag
def create_dict(str_dict):
    return ast.literal_eval(str_dict)